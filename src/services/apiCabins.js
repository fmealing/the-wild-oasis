import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  let imagePath = newCabin.image;
  let imageName;

  // Assume newCabin.image is an object with a 'name' property when a new image needs to be uploaded.
  if (
    newCabin.image &&
    typeof newCabin.image === "object" &&
    newCabin.image.name
  ) {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  } else if (
    typeof imagePath === "string" &&
    imagePath.startsWith(supabaseUrl)
  ) {
    // If imagePath is a string and starts with supabaseUrl, it's assumed to be correctly formatted.
  } else {
    // Handle other cases or set a default behavior for imagePath if necessary.
    imagePath = undefined; // Or set to a default imagePath if you have one.
  }

  let query;
  // A) CREATE
  if (!id) {
    query = supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select();
  }
  // B) EDIT
  else {
    query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  let { data, error } = await query.single();

  if (error) {
    console.error(error);
    throw new Error("Cabin operation failed");
  }

  // Only attempt to upload if imageName is set, indicating a new image file was provided
  if (imageName) {
    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (uploadError) {
      console.error(uploadError);
      // If image upload fails, delete the newly created or updated cabin record to maintain consistency
      await supabase.from("cabins").delete().match({ id: data.id });
      throw new Error("Cabin image could not be uploaded, operation aborted");
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
