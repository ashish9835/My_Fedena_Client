import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import { TranslateConfigService } from 'src/app/translate-config.service'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedLanguage: string

  loginUserData = {
    username: '',
    password: '',
  }

  constructor(
    private _auth: AuthService,
    private router: Router,
    private translateConfigService: TranslateConfigService,
    public alertController: AlertController,
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage()
    this.presentAlertRadio()
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage)
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      (res) => {
        console.log(res)
        // console.log(res.token.password_reset_required);
        if (res.succes == true) {
          res.token.password_reset_required = true
          console.log(res.token.password_reset_required)
          window.localStorage.setItem('access_token', res.token.access_token)
          if (res.token.password_reset_required == true) {
            return this.router.navigate(['/change-password'])
          } else {
            return this.router.navigate(['/dashboard'])
          }
        } else {
          console.log(res.error)
        }
      },
      (err) => console.log(err),
    )
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Select Language',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'English',
          value: 'en',
          handler: () => {
            console.log('Radio 1 selected')
          },
          checked: true,
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Arabic',
          value: 'ar',
          handler: () => {
            console.log('Radio 2 selected')
          },
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel')
          },
        },
        {
          text: 'Ok',

          handler: (data: string) => {
            console.log(data)
            this.selectedLanguage = data
            console.log(this.selectedLanguage)
            this.translateConfigService.setLanguage(this.selectedLanguage)
            window.localStorage.setItem('language', this.selectedLanguage)
          },
        },
      ],
    })

    await alert.present()
  }
}
