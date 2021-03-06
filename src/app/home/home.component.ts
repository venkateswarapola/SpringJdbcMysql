import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Data } from '../data';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  LoginForm: FormGroup;
  UpdateForm: FormGroup;
  ExistForm: FormGroup;
  data1:Data;
  data2:Data;
  data3:Data;
  data4:Data;
  expression:boolean = false;
  exist:string;
  constructor(private router: Router,private formBuilder: FormBuilder,private auth:AuthService) { }

  ngOnInit() {
  	this.createform();
  	this.userdetails();
  }

createform()
{
this.LoginForm = this.formBuilder.group({
	id: ['', [Validators.required] ],
     email: ['', [Validators.required] ],
     password: ['', [Validators.required] ],
    });
this.UpdateForm = this.formBuilder.group({
	oldid: ['', [Validators.required] ],
	id: ['', [Validators.required] ],
     email: ['', [Validators.required] ],
     password: ['', [Validators.required] ],
    });
this.ExistForm = this.formBuilder.group({
     email: ['', [Validators.required] ]
    });
}
onSubmit()
{
	this.auth.
	putuser(this.LoginForm.value.id,this.LoginForm.value.email,this.LoginForm.value.password)
	.subscribe(data123 => {
		this.data1 = data123,
		console.log(this.data1),
		console.log(typeof this.data1),
		this.expression = true;
    });
    	setTimeout(()=>{
    	this.auth.patuser123().subscribe(datauser => {
    	this.data4 = datauser,
    	this.data2 =datauser,
		console.log(this.data4),
		console.log(typeof this.data4),
		this.expression = true
		});
    }, 500)
}

hello()
{
	this.auth.getusers().subscribe(datauser => {
		this.data2 = datauser,
		console.log(this.data2),
		console.log(typeof this.data2),
		this.expression = true});
}

deletuser(id:number)
{
	this.auth.deleteuser(id).subscribe(datauser => {
		this.data2 = datauser,
		console.log(this.data2),
		console.log(typeof this.data2),
		this.expression = true});
	setTimeout(()=>{
    	this.auth.patuser123().subscribe(datauser => {
    	this.data4 = datauser,
    	this.data2 = datauser,
		console.log(this.data4),
		console.log(typeof this.data4),
		this.expression = true
		});
    }, 500)
}

updateuser()
{
	this.auth.
	updatuser(this.UpdateForm.value.oldid,this.UpdateForm.value.id,this.UpdateForm.value.email,this.UpdateForm.value.password)
	.subscribe(datapop => {
		this.data3 = datapop,
		console.log(this.data3),
		console.log(typeof this.data3),
		this.expression = true;
    });
setTimeout(()=>{
    	this.auth.patuser123().subscribe(datauser => {
    	this.data4 = datauser,
    	this.data2 = datauser,
		console.log(this.data4),
		console.log(typeof this.data4),
		this.expression = true
		});
    }, 500)
}
existuser()
{
	this.auth.
	exisuser(this.ExistForm.value.email)
	.subscribe(exist123 => {
		//console.log(typeof exist123);
		if(exist123)
			this.router.navigate(['exists']);
		else
			this.exist = "no such user!!";
		console.log(exist123);
    });
}

 values = '';

  onKey(event: any) { // without type info
    this.values = event.target.value ;
    this.auth.patuser(this.values).subscribe(datauser => {
		this.data4 = datauser,
		console.log(this.data4),
		console.log(typeof this.data4),
		this.expression = true});

}

userdetails()
{
	this.auth.patuser123().subscribe(datauser => {
		this.data4 = datauser,
		console.log(this.data4),
		console.log(typeof this.data4),
		this.expression = true});
}

}
