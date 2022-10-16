import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordChecker } from './custom-validators/password-checker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'signup-reactive';
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue]
    },{Validators: PasswordChecker('password', 'confirmPassword')});
  }
  get h(){
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
