import { Page, NavController, Toast} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { OnInit } from '@angular/core'
import { Dashboard } from '../dashboard/dashboard'

@Page({
  templateUrl: 'build/pages/signin/signin.html'
  // directives: [Dashboard]
})
export class HomePage implements OnInit {
  user: any = {};
  data: FirebaseListObservable<any[]>;
  authData: any;
  isSigninClicked: boolean = false;
  isSignupClicked: boolean = false;

  constructor(private af: AngularFire, private nav: NavController) {

  };


  ngOnInit() {

  }


  presentToast(message: string, duration: number = null, button: boolean = true) {
    let toast = Toast.create({
      message: message,
      showCloseButton: button,
      closeButtonText: 'dismiss',
      duration: duration
    })
    this.nav.present(toast)
  };



  signUp(data) {
    this.isSignupClicked = true;
    this.af.auth.createUser({
      email: data.email,
      password: data.password
    })
      .then((data) => {
        console.log(data)
        this.isSignupClicked = false;
      })
      .catch((err) => {
        this.presentToast(err)
        this.isSignupClicked = false;
      })
  }



  login(data) {
    this.isSigninClicked = true;

    this.af.auth.login({
      email: data.email,
      password: data.password
    })
      .then(data => {
        this.authData = data;
        console.log(this.authData)
      })
      .then(() => {
        this.presentToast('Welcome!', 3000, false)
        this.nav.push(Dashboard)
        this.isSigninClicked = false;
      })
  }


}
