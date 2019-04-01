import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { ModalMFAComponent } from '../modal-mfa/modal-mfa.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
photoUrl: string;
bsModalRef : BsModalRef;

  constructor(public authService: AuthService,
  private alertify: AlertifyService,
  private router: Router,
  private modalService: BsModalService) { }
  private  mfacode: string;

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }


  login() {
   
    const initialState = {
    userName : this.model.username,
    title: 'QR Code'
    };
    this.bsModalRef  = this.modalService.show(ModalMFAComponent, {initialState});
    this.bsModalRef .content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe(result => {
      this.mfacode = result;
      if (!this.mfacode)
      this.alertify.error("Invalid MFA Code");
      else  
      {
        this.model.mfacode = this.mfacode;
        this.authService.login(this.model).subscribe(next => {
          this.alertify.sueccess('Logged in Successfully');
        }, error => {
          this.alertify.error(error);
        }, () => {
          this.router.navigate(['/members']);
        });
      }
    })  
  }

  loggedIn() {
   return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged Out');
    this.router.navigate(['/home']);
  }

}

  /*

import { TOTP } from 'jsotp'
import qrcode from 'qrcode-generator'

export default {
  components: { TOTP, qrcode },
  name: 'Login',
  data() {
    return {
      code2Factor: '',
      loading: '',
      userName: '',
      password: '',
      type: ['Local', 'Active Directory'],
      typeLogin: 'Active Directory'
    }
  },
  methods: {
    authentication2Factor() {
      var myTotp = TOTP(this.secretKey)
      if (myTotp.verify(this.code2Factor)) {
        this.$refs.modal2Factors.hide()
        if (this.typeLogin === 'Active Directory') {
          this.loginAD()
        }
        if (this.typeLogin === 'Local') {
          this.loginLocal()
        }
      } else {
        this.$root.notify('El código no es válido')
      }
    },
    openGoAuth() {
      window.location.href = this.urlCode2Factor
    },
    cancel2Factor() {
      this.$refs.modal2Factors.hide()
    },
    login() {
      if (this.isDebug) {
        if (this.typeLogin === 'Active Directory') {
          this.loginAD()
        }
        if (this.typeLogin === 'Local') {
          this.loginLocal()
        }
      } else {
        var typeNumber = 4
        var errorCorrectionLevel = 'L'
        var qr = qrcode(typeNumber, errorCorrectionLevel)
        qr.addData(this.urlCode2Factor)
        qr.make()
        document.getElementById('qrCode').innerHTML = qr.createImgTag(7)
        this.$refs.modal2Factors.show()
      }
    },
    loginLocal() {
      var key = CryptoJS.enc.Utf8.parse(this.$store.state.global.keySecure)
      var iv = CryptoJS.enc.Utf8.parse(this.$store.state.global.iv)
      var userName = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.userName), key,
        {
          keySize: 32,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }).toString()

      var password = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.password), key,
        {
          keySize: 32,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }).toString()

      api.request('oauth/local', {
        userName,
        password
      })
        .then(response => {
          var data = response.data
          if (data) {
            this.oAuth(data, 'local')
          } else {
            this.$root.notify('Usuario y/o contraseña incorrecta')
          }
        })
        .catch(error => {
          this.$root.notify('Usuario y/o contraseña incorrecta')
          console.log(error)
        })
    },
    loginAD() {
      var key = CryptoJS.enc.Utf8.parse(this.$store.state.global.keySecure)
      var iv = CryptoJS.enc.Utf8.parse(this.$store.state.global.iv)
      var userName = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.userName), key,
        {
          keySize: 32,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }).toString()

      var password = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.password), key,
        {
          keySize: 32,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }).toString()

      api.request('oauth/ad', {
        userName,
        password
      })
        .then(response => {
          var data = response.data
          if (data) {
            this.oAuth(data, 'ad')
          } else {
            this.$root.notify('Usuario y/o contraseña incorrecta')
          }
        })
        .catch(error => {
          this.$root.notify('Usuario y/o contraseña incorrecta')
          console.log(error)
        })
    },
    checkCreds() {
      const {
        userName,
        password
      } = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      api.request('oAuth/login', {
        userName,
        password
      })
        .then(response => {
          this.toggleLoading()

          var data = response.data
          if (data.error) {
            var errorName = data.error.name
            if (errorName) {
              this.response =
                errorName === 'InvalidCredentialsError' ? 'Username/Password incorrect. Please try again.' : errorName
            } else {
              this.response = data.error
            }

            return
          }
          if (data.name) {
            var token = data.token

            this.$store.commit('SET_USER', data.name)
            this.$store.commit('SET_TOKEN', token)

            if (window.localStorage) {
              window.localStorage.setItem('user', data.name)
              window.localStorage.setItem('token', token)
            }

            this.$router.push(data.redirect ? data.redirect : '/')
          }
        })
        .catch(error => {
          this.$store.commit('TOGGLE_LOADING')
          console.log(error)

          this.response = 'Server appears to be offline'
          this.toggleLoading()
        })
    },
    toggleLoading() {
      this.loading = this.loading === '' ? 'loading' : ''
    },
    resetResponse() {
      this.response = ''
    }
  }
}





<template>
      <b-modal ref="modal2Factors" title="Autenticación segura" :no-close-on-backdrop="true">
            <div class="form-group">
              <label>Por favor, escanee el código con la aplicación segura</label>
            </div>     
            <div class="form-group">
              <div class="qr" id="qrCode" @click="openGoAuth()"></div>
            </div>
            <div class="form-group">
              <label>Código:</label>
              <the-mask class="form-control input-lg text-centered" :mask="['### ###']" v-model="code2Factor"/>
            </div>
        <div slot="modal-footer">
          <b-btn @click="cancel2Factor">
           Cancelar
         </b-btn>
         <b-btn variant="primary" @click="authentication2Factor">
           Aceptar
         </b-btn>
       </div>
    </b-modal>
    </div>
</template>
<script src="./login.js"></script>
<style scoped>
.qr {
  text-align: center;
}
</style>


  */