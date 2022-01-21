import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController, ToastController } from "@ionic/angular";
import { Password } from "src/app/providers/check_password";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.page.html",
  styleUrls: ["./change-password.page.scss"],
})
export class ChangePasswordPage implements OnInit {
  password = {
    old_password: "",
    new_password: "",
  };
  passwordIcon: string = 'eye-off';
  passwordIcon1: string = 'eye-off';
  passwordType: string = 'password';

  loading: any;

  constructor(
    private router: Router,
    public toastController: ToastController,
    private changePassword: Password,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}

  clear() {
    this.router.navigate(["/dashboard"]);
  }

  showPassword(input: any): any {
    input.type = input.type === "password" ? "text" : "password";
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  showPassword1(input: any): any {
    input.type = input.type === "password" ? "text" : "password";
    this.passwordIcon1 = this.passwordIcon1 === 'eye-off' ? 'eye' : 'eye-off';
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 2000
    });
    return await this.loading.present();
  }


  resetPassword() {
    // this.presentLoading();
    if (window.localStorage.getItem('language')== 'en'){
      this.presentLoading('Please wait');
    }
    else{
      this.presentLoading('أرجو الإنتظار');
    }
    this.changePassword.resetPassword(this.password).subscribe(
      (res: any) => {
      console.log(res);
      console.log(res.succes);
        if(res.description != 'invalid_username_or_password'){
          this.loading.dismiss();
            window.localStorage.setItem("access_token", res.token.access_token);
            // this.presentToast('Password changed succesfully');
            if (window.localStorage.getItem('language')== 'en'){
              this.presentToast('Password changed succesfully');
            }
            else{
              this.presentToast('تم تغيير كلمة المرور بنجاح');
            }
            this.router.navigate(['/dashboard']);
          }
          else{
            this.loading.dismiss();
            console.log('working');
            // this.presentToast('Current password and login password should be same');
            if (window.localStorage.getItem('language')== 'en'){
              this.presentToast('Current password and login password should be same');
            }
            else{
              this.presentToast('يجب أن تكون كلمة المرور الحالية وكلمة مرور تسجيل الدخول متطابقتين');
            }
          }
      }, error => {
        console.log(error);
      })
  }


}
