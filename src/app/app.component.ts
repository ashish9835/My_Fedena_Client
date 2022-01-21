import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AlertController, MenuController } from '@ionic/angular'
import { TranslateConfigService } from 'src/app/translate-config.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  selectedLanguage: string

  constructor(
    private router: Router,
    public menuCtrl: MenuController,
    private translateConfigService: TranslateConfigService,
    public alertController: AlertController,
  ) {}

  changePassword() {
    this.router.navigate(['/change-password'])
    this.menuCtrl.toggle()
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Radio',
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
