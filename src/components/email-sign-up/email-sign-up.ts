import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { ToastController, ViewController, IonicPage } from 'ionic-angular';


/**
 * 
 * Component for email sign up
 * 
 * @export
 * @class EmailSignUpComponent
 */

@IonicPage()

@Component({
  selector: 'email-sign-up',
  templateUrl: 'email-sign-up.html'
})
export class EmailSignUpComponent {

  public title = 'Sign up with email'
  public emailSignUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthProvider,
    public user: UserProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {



    function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
      return (group: FormGroup): {[key: string]: any} => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
          return {
            mismatchedPasswords: true
          };
        }
      }
    }

    // building the form
    this.emailSignUpForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      confirmPassword: ['',Validators.required],
      userId: ['',Validators.compose([Validators.minLength(6), Validators.required])],
      userName: ['',Validators.compose([Validators.minLength(1), Validators.required])],
      isMentee: ['',Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});
  }

  /**
   * Toast creator
   * 
   * @param message
   */
  createToast(message: string) {
    return this.toastCtrl.create({
      message,
      duration: 3000
    })
  }


  


  emailSignUpFormSubmit() {
    // first we check, if the form is valid
    if (!this.emailSignUpForm.valid) {
      this.createToast('Form not valid').present();
      return
    }

    if (this.emailSignUpForm.value.password !== this.emailSignUpForm.value.confirmPassword){
      this.createToast("password doesn't mathced").present();
      return
    }
    else {
      // if the form is valid, we continue with validation
      this.auth.signUpUser(this.emailSignUpForm.value.email, this.emailSignUpForm.value.password, this.emailSignUpForm.value.userName, this.emailSignUpForm.value.userId, this.emailSignUpForm.value.isMentee )
        .then(() => {
          // showing succesfull message
          this.createToast('Signed up with email: ' + this.emailSignUpForm.value.email).present()
          // closing dialog
          this.viewCtrl.dismiss()
          
        },
        /**
         * Handle Authentication errors
         * Here you can customise error messages like our example.
         * https://firebase.google.com/docs/reference/js/firebase.auth.Error
         * 
         * mismatch with error interface: https://github.com/angular/angularfire2/issues/976
         */
        (error) => {
          this.createToast(error.message).present();
        })
    }
  }

  cancelClicked() {
    this.viewCtrl.dismiss()
  }

}
