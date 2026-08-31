/* =========================================================
   DAMITH PHOTO — PRIVATE ADMIN
   Supabase Media Manager
========================================================= */


/* =========================================================
   SUPABASE CONFIG
   අපි මේ දෙක පස්සේ දාමු
========================================================= */

const SUPABASE_URL = "PASTE_YOUR_SUPABASE_URL_HERE";

const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";


/* =========================================================
   SUPABASE CLIENT
========================================================= */

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );


/* =========================================================
   ELEMENTS
========================================================= */

const loginScreen =
  document.getElementById("loginScreen");

const adminPanel =
  document.getElementById("adminPanel");

const loginForm =
  document.getElementById("loginForm");

const loginMessage =
  document.getElementById("loginMessage");

const logoutButton =
  document.getElementById("logoutButton");

const categorySelect =
  document.getElementById("categorySelect");

const mediaFiles =
  document.getElementById("mediaFiles");

const uploadButton =
  document.getElementById("uploadButton");

const uploadStatus =
  document.getElementById("uploadStatus");

const mediaGrid =
  document.getElementById("mediaGrid");


/* =========================================================
   SHOW / HIDE PANELS
========================================================= */

function showAdmin() {

  loginScreen.classList.add("hidden");

  adminPanel.classList.remove("hidden");

  loadMedia();
}


function showLogin() {

  adminPanel.classList.add("hidden");

  loginScreen.classList.remove("hidden");
}


/* =========================================================
   CHECK LOGIN
========================================================= */

async function checkUser() {

  const {
    data,
    error
  } = await supabaseClient.auth.getSession();

  if (error) {

    console.error(error);

    showLogin();

    return;
  }

  if (data.session) {

    showAdmin();

  } else {

    showLogin();

  }
}


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();

    loginMessage.textContent =
      "Logging in...";


    const email =
      document
        .getElementById("adminEmail")
        .value
        .trim();

    const password =
      document
        .getElementById("adminPassword")
        .value;


    const {
      data,
      error
    } =
      await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
      });


    if (error) {

      console.error(error);

      loginMessage.textContent =
        "Login failed. Check your email and password.";

      return;
    }


    if (data.session) {

      loginMessage.textContent = "";

      showAdmin();

    }

  }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutButton.addEventListener(
  "click",
  async function () {

    await supabaseClient.auth.signOut();

    mediaGrid.innerHTML = "";

    showLogin();

  }
);


/* =========================================================
   UPLOAD MEDIA
========================================================= */

uploadButton.addEventListener(
  "click",
  async function () {

    const files =
      Array.from(mediaFiles.files);

    const category =
      categorySelect.value;


    if (files.length === 0) {

      uploadStatus.textContent =
        "Please choose photos or videos first.";

      return;
    }


    uploadStatus.textContent =
      "Uploading...";


    uploadButton.disabled = true;


    let uploadedCount = 0;


    try {

      for (const file of files) {

        const extension =
          file.name
            .split(".")
            .pop()
            .toLowerCase();


        const safeName =
          file.name
            .replace(/[^a-zA-Z0-9._-]/g, "_");


        const fileName =
          Date.now() +
          "_" +
          Math.random()
            .toString(36)
            .substring(2, 8) +
          "_" +
          safeName;


        const filePath =
          category +
          "/" +
          fileName;


        /* -----------------------------------------
           UPLOAD TO STORAGE
        ----------------------------------------- */

        const {
          error: uploadError
        } =
          await supabaseClient.storage
            .from("media")
            .upload(
              filePath,
              file,
              {
                cacheControl: "3600",
                upsert: false
              }
            );


        if (uploadError) {

          throw uploadError;

        }


        /* -----------------------------------------
           PUBLIC URL
        ----------------------------------------- */

        const {
          data: publicData
        } =
          supabaseClient.storage
            .from("media")
            .getPublicUrl(filePath);


        const publicUrl =
          publicData.publicUrl;


        /* -----------------------------------------
           SAVE MEDIA INFO
        ----------------------------------------- */

        const {
          error: databaseError
        } =
          await supabaseClient
            .from("media")
            .insert({

              file_name: fileName,

              file_path: filePath,

              media_url: publicUrl,

              category: category,

              media_type:
                file.type.startsWith("video/")
                  ? "video"
                  : "image"

            });


        if (databaseError) {

          throw databaseError;

        }


        uploadedCount++;

        uploadStatus.textContent =
          `Uploaded ${uploadedCount} of ${files.length}...`;

      }


      uploadStatus.textContent =
        `Successfully uploaded ${uploadedCount} file(s).`;


      mediaFiles.value = "";


      await loadMedia();


    } catch (error) {

      console.error(error);

      uploadStatus.textContent =
        "Upload failed. Please check the setup.";

    }


    uploadButton.disabled = false;

  }
);


/* =========================================================
   LOAD MEDIA
========================================================= */

async function loadMedia() {

  mediaGrid.innerHTML =
    "<p>Loading media...</p>";


  const {
    data,
    error
  } =
    await supabaseClient
      .from("media")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(error);

    mediaGrid.innerHTML =
      "<p>Unable to load media.</p>";

    return;
  }


  mediaGrid.innerHTML = "";


  if (!data || data.length === 0) {

    return;

  }


  data.forEach(
    function (item) {

      const wrapper =
        document.createElement("div");

      wrapper.className =
        "media-item";


      let mediaElement;


      if (item.media_type === "video") {

        mediaElement =
          document.createElement("video");

        mediaElement.controls = true;

        mediaElement.preload = "metadata";

      } else {

        mediaElement =
          document.createElement("img");

        mediaElement.loading = "lazy";

      }


      mediaElement.src =
        item.media_url;


      mediaElement.alt =
        item.category;


      const deleteButton =
        document.createElement("button");

      deleteButton.className =
        "media-delete";

      deleteButton.textContent =
        "Delete";


      deleteButton.addEventListener(
        "click",
        function () {

          deleteMedia(item);

        }
      );


      wrapper.appendChild(
        mediaElement
      );

      wrapper.appendChild(
        deleteButton
      );


      mediaGrid.appendChild(
        wrapper
      );

    }
  );

}


/* =========================================================
   DELETE MEDIA
========================================================= */

async function deleteMedia(item) {

  const confirmed =
    confirm(
      "Delete this media permanently?"
    );


  if (!confirmed) {

    return;

  }


  uploadStatus.textContent =
    "Deleting...";


  try {

    /* -----------------------------------------
       DELETE STORAGE FILE
    ----------------------------------------- */

    const {
      error: storageError
    } =
      await supabaseClient.storage
        .from("media")
        .remove([
          item.file_path
        ]);


    if (storageError) {

      throw storageError;

    }


    /* -----------------------------------------
       DELETE DATABASE RECORD
    ----------------------------------------- */

    const {
      error: databaseError
    } =
      await supabaseClient
        .from("media")
        .delete()
        .eq(
          "id",
          item.id
        );


    if (databaseError) {

      throw databaseError;

    }


    uploadStatus.textContent =
      "Media deleted.";


    await loadMedia();


  } catch (error) {

    console.error(error);

    uploadStatus.textContent =
      "Delete failed.";

  }

}


/* =========================================================
   AUTH STATE LISTENER
========================================================= */

supabaseClient.auth.onAuthStateChange(
  function (event, session) {

    if (session) {

      showAdmin();

    } else {

      showLogin();

    }

  }
);


/* =========================================================
   START
========================================================= */

checkUser();
