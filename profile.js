document.addEventListener("DOMContentLoaded", () => {
  const displayName = document.getElementById("displayName");
  const profilePreview = document.getElementById("profilePreview");
  const imageUpload = document.getElementById("imageUpload");

  // Load user data
  const userData = JSON.parse(localStorage.getItem("loggedInUser"));
  if (userData) {
    displayName.textContent = userData.fullname || "User";
    document.getElementById("fullname").value = userData.fullname || "";
    document.getElementById("username").value = userData.username || "";
    document.getElementById("phone").value = userData.phone || "";
    document.getElementById("gender").value = userData.gender || "Female";
    document.getElementById("email").value = userData.email || "";
  }

  // Load saved image
  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
    profilePreview.src = savedImage;
  }

  // Image preview logic
  imageUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        profilePreview.src = reader.result;
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // Status check
  const statusLabel = document.getElementById("status-label");
  const lastLogin = localStorage.getItem("lastLogin");
  const lastLoginDate = lastLogin ? new Date(lastLogin) : null;
  const now = new Date();
  const isActive = lastLoginDate && ((now - lastLoginDate) / (1000 * 60 * 60 * 24)) <= 7;
  statusLabel.textContent = isActive ? "Active" : "Inactive";
  statusLabel.classList.add(isActive ? "active" : "inactive");
  statusLabel.classList.remove(isActive ? "inactive" : "active");

  // Edit toggle
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const editFields = document.getElementById("editFields");
  let isEditing = false;

  editBtn.addEventListener("click", () => {
    isEditing = !isEditing;
    editFields.classList.toggle("hidden", !isEditing);
    saveBtn.style.display = isEditing ? "inline-block" : "none";
  });

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const updatedUser = {
      fullname: document.getElementById("fullname").value.trim(),
      username: document.getElementById("username").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      gender: document.getElementById("gender").value,
      email: document.getElementById("email").value.trim()
    };

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    displayName.textContent = updatedUser.fullname;

    const successMsg = document.createElement("div");
    successMsg.textContent = "Profile updated successfully!";
    successMsg.className = "success-message";
    editFields.parentNode.appendChild(successMsg);

    setTimeout(() => {
      editFields.classList.add("hidden");
      saveBtn.style.display = "none";
      successMsg.remove();
      isEditing = false;
    }, 2000);
  });
});
