import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-promises-page',
  templateUrl: './promises-page.component.html',
  styleUrls: ['./promises-page.component.css'],
})
export class PromisesPageComponent implements OnInit {
  public users: User[] = [];

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola mundo');
    //   } else {
    //     reject('Algo salió mal');
    //   }
    // });

    // promesa
    //   .then(console.log)
    //   .catch((error) => console.warn('error en mi promesa', error));

    // console.log('fin del init');

    this.getUsuarios()
      .then((usuarios) => {
        console.log(usuarios);
        this.users = usuarios;
      })
      .catch(console.warn);

    console.log({GAA: this.users});
  }

  getUsuarios() {
    return new Promise<User[]>((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });
  }
}
