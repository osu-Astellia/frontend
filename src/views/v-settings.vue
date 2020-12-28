<template>
  <b-overlay :show="!loaded">
    <div class="settings">
      <div class="DataGroup">
        <div class="DataGroupTitle">Account</div>
        <div class="DataInputs">
          <span>Username <input v-model="data.username" type="text" /><br /></span>
              

          <br />
        </div>
      </div>
      <hr />
      <div class="DataGroup">
        <div class="DataGroupTitle" style="padding: 0 !important">Avatar</div>
        <div class="DataInputs">
          <br />

          <div
            style="
              display: flex;
              flex-direction: column;
              width: auto;
              align-items: center;
            "
          >
            <img
              :src="avatarURL"
              height="128px"
              width="128px"
              style="object-fit: cover"
            />

            <input
              @change="avatarUpload"
              class="inputFile"
              id="avatarFile"
              type="file"
              accept="image/png, image/jpeg"
            />
            <label class="uploadeBtn" for="avatarFile">Upload</label>
          </div>
        </div>
      </div>

      <hr />
      <!--- <div class="DataGroup">
        <div class="DataGroupTitle">Personalization</div>

        <div class="DataInputs">
          <div class="DataInput">
            <span
              >Use NC instead of DT<b-form-checkbox
                v-model="settings.nc_instead_dt"
                switch
            /></span>
          </div>
        </div>
      </div>--->
      <div class="DataGroup">
        <div class="DataGroupTitle">Security</div>

        <div class="DataInputs">
          <div class="DataInput">
            <span
              >Email<input
                readonly
                v-b-tooltip.hover
                title="Email can be change only by administrators"
                v-model="data.email" /></span
            ><br />
            <span
              >New password<input
                type="password"
                v-model="data.newpassword" /></span
            ><br />
            <span
              >Current password<input
                type="password"
                v-model="data.currentpassword" /></span
            ><br />
            <button @click="savePassword">Save</button>
          </div>
        </div>
      </div>

    </div>
  </b-overlay>
</template>

<script>
import { mapState, mapActions } from "vuex";
import bbCodeParser from "js-bbcode-parser";
export default {
  name: "v-settings",
  ...mapState(["token"]),
  ...mapActions(["infoAlert", "errorAlert"]),
  data() {
    return {
      token: this.$store.state.token,
      nc_instead_dt: false,
      userdata: null,
      isParsing: false,
      parsedUserpage: "",
      data: {
        username: null,
        userpage_content: "",
      },
      settings: {
        nc_instead_dt: false,
      },
      profileInfo: null,
      avatarURL: "",
      avatarStyle: "",
      loaded: false,
    };
  },
  methods: {
    async saveUserpage() {
      
    },
    avatarUpload(file) {
      this.loaded = false;
      const data = new FormData();
      data.append("File", file.target.files[0]);
      this.axios
        .patch("/api/users/update_avatar", data, {
          headers: {
            Authorization: this.token,
          },
        })
        .then((res) => {
          this.avatarURL = this.avatarURL + `?t=${Date.now()}`;
          this.$store.dispatch("infoAlert", {
            message: `Your avatar is uploaded to the server, if it hasn't changed on the site, press CTRL+F5.`,
            $bvtoast: this.$bvToast,
          });
          this.loaded = true;
        })
        .catch((e) => {
          this.loaded = true;
          this.$store.dispatch("errorAlert", {
            message: e.response,
            $bvtoast: this.$bvtoast,
          });
        });
      this.$store.dispatch('setUser', {token: this.$store.state.token, user: this.$store.state.user});

    },
    async fetchUserData() {
      this.userdata = await this.axios
        .get("/api/users/me", {
          headers: {
            Authorization: this.token,
          },
        })
        .then((res) => res.data)
        .catch((e) => {
          this.$store.dispatch("errorAlert", {
            message: "Please log in first!",
          });
          this.$bvModal.show("LoginModal");
          this.$router.push({ path: "/" });
        });

      this.profileInfo = await fetch(`/api/users/profile/info?u=${this.userdata.id}`).then((res) => res.json());

      this.data = {
        url: `/u/${this.userdata.id}`,
        username: this.userdata.username,
        email: this.userdata.email,
        newpassword: "",
        currentpassword: "",
        userpage_content: "",
      };
      this.avatarURL = `https://a.astellia.club/${this.userdata.id}`;
      this.data.userpage_content = this.profileInfo.userpage_content || "";

      this.nc_instead_dt = this.userdata.nc_instead_dt
        ? this.userdata.nc_instead_dt
        : false;
      this.settings = this.userdata;
      this.loaded = true;
    },

    async savePassword() {
      fetch("/api/users/update_user_password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },
        body: JSON.stringify({
          email: this.data.email,
          new_password: this.data.newpassword,
          current_password: this.data.currentpassword,
        }),
      }).then(async (res) => {
        if (res.status !== 200) {
          let message = await res.json();
          alert(`Error while changing password: ${message.message}`);
        } else {
          alert("ok");
        }
      });
    },
    async updateUsername() {
      fetch("/frontend/api/v1/update/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },
        body: JSON.stringify({
          password: "",
          username: this.data.username,
        }),
      })
        .then(async (res) => {
          let { message } = await res.json();
          if (!res.ok) return alert(message);
          alert("OK, now please reloag");
          localStorage.removeItem("token");
          window.location.reload();
        })
        .catch((e) => {
          alert(e.message);
        });
    },
  },

  watch: {
    "settings.nc_instead_dt"(val) {
      if (!this.loaded) return;
      this.loaded = false;
      this.settings.nc_instead_dt = val;
      this.axios
        .patch("/frontend/api/v1/updateUser", this.settings, {
          headers: {
            Authorization: this.token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.loaded = true;
        })
        .catch((e) => {
          this.$router.push({ path: "/" });
        });
    },
    "data.userpage_content"(val) {
      this.parsedUserpage = bbCodeParser.parse(val);
    },
  },
  mounted() {
    this.fetchUserData();
  },
  metaInfo: {
    title: "Settings",
  },
};
</script>

<style scoped>
button {
  outline: none;
  background-color: #5639ac;
  border: 1px solid #5639ac;
  color: white;
  margin-top: 15px;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  transition: 0.2s;
}

button:hover {
  background-color: #5639d5;
  border: 1px solid #5639d5;
}

.settings {
  background-color: #21263E;
  padding-bottom: 50px;
}
.view {
  width: 70%;
  margin: 0 auto;
}

.settings {
  border-radius: 30px;
  margin: 30px;
}

span input {
  margin: 0 10px;
  transition: 0.09s;
}
span {
  display: inline-flex;
  justify-content: space-between;
  width: 400px;
}

span:not(:first-child) {
  margin-top: 10px;
}

form {
  padding: 40px;
}

.inputFile {
  height: 0.1px;
  width: 0.1px;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  z-index: -1;
}

.uploadeBtn {
  display: inline-block;
  height: 30px;
  width: 128px;
  background-color: #5639ac;
  margin-top: 10px;
  border: 2px solid #5639ac;
  border-radius: 10px;
  transition: 0.4s;
}

.uploadeBtn:hover {
  background-color: #5639d5;
  border: 2px solid #5639d5;
}
input {
  outline: none;
  margin: 0;
  background: none;
  background-color: rgba(0, 0, 0, 0);
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 4px;
  flex: 1;
  max-width: 250px;
  align-self: stretch;
  background-color: #3d3946;
  border: 2px solid transparent;
  color: #fff;
  font-weight: 400;
  padding: 5px;
}

input:focus {
  border: 3px solid #c2b8e0;
}

.DataGroupTitle {
  font-size: 32px;
  padding: 1.5rem;
}

.grouptitle {
  font-size: 30px;
}

.userpageInput {
  max-width: 100%;
  width: 90% !important;
  min-height: 250px;
  height: auto;
}
textarea {
  outline: none;
  margin: 0;
  background: none;
  background-color: rgba(0, 0, 0, 0);
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 4px;
  flex: 1;
  max-width: 250px;
  align-self: stretch;
  background-color: #3d3946;
  border: 2px solid transparent;
  color: #fff;
  font-weight: 400;
  padding: 5px;
}

textarea:focus {
  border: 3px solid #c2b8e0;
}

* {
  text-align: center;
}
</style>
