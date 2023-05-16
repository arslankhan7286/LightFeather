import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LightFeatherServiceService } from './light-feather.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent implements OnInit {
  myForm!: FormGroup;
  isEmailEnabled: boolean = false;
  isPhoneNumberEnabled: boolean = false;
  managers: any[] = [];
  supervisors: String = '';

  constructor(
    private formBuilder: FormBuilder,
    private lightFeatherService: LightFeatherServiceService, private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      preferredNotification: [''],
      phoneNumber: [{ value: '', disabled: true }, [Validators.required]],
      dropdownOption: ['', Validators.required],
    });

    this.fetchManagers();
  }
  onCheckboxChange(field: string) {
    if (field === 'email') {
      this.isEmailEnabled = !this.isEmailEnabled;
      const emailControl = this.myForm.get('email');
      if (this.isEmailEnabled) {
        emailControl?.enable();
      } else {
        emailControl?.disable();
        emailControl?.setValue('');
      }
    } else if (field === 'phoneNumber') {
      this.isPhoneNumberEnabled = !this.isPhoneNumberEnabled;
      const phoneNumberControl = this.myForm.get('phoneNumber');
      if (this.isPhoneNumberEnabled) {
        phoneNumberControl?.enable();
      } else {
        phoneNumberControl?.disable();
        phoneNumberControl?.setValue('');
      }
    }
  }

  onSubmit(form: FormGroup) {
    if (this.myForm.valid) {
      this.lightFeatherService.submitForm(form).subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          this.myForm.reset();
          this.isEmailEnabled = false;
          this.isPhoneNumberEnabled = false;
          this.myForm.get('email')?.disable();
          this.myForm.get('phoneNumber')?.disable();
          this.toastr.success('Form submitted successfully!');
        },
        (error) => {
          console.error('Error submitting form:', error);
        }
      );
    }
  }

  fetchManagers() {
    this.lightFeatherService.fetchManagers().subscribe(
      (response) => {
        this.managers = response;
      },
      (error) => {
        console.error('Error fetching managers:', error);
      }
    );
  }
}
