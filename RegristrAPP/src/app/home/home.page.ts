import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = ''; // Variable para el nombre de usuario
  password: string = ''; // Variable para la contraseña

  constructor(private router: Router) {}

  login() {
    // Recupera los datos del alumno almacenados en el LocalStorage
    const alumnoData = localStorage.getItem('alumno');
    if (alumnoData) {
      const alumno = JSON.parse(alumnoData);
      
      // Verifica si el nombre de usuario y la contraseña coinciden
      if (this.username === alumno.nombreUsuario && this.password === alumno.password) {
        // Si coinciden, redirige al usuario a la página de lector
        this.router.navigate(['/lector']);
      } else {
        // Si no coinciden, muestra un mensaje de error o realiza la acción correspondiente
        console.error('Nombre de usuario o contraseña incorrectos.');
      }
    } else {
      // Si no se encuentran datos en el LocalStorage, muestra un mensaje de error o realiza la acción correspondiente
      console.error('No se encontraron datos de registro. Regístrate primero.');
    }
  }

  register() {
    // Redirige al usuario a la página de registro
    this.router.navigate(['/registro']);
  }

  resetPassword() {
    // Agrega la lógica para restablecer la contraseña si es necesario
    this.router.navigate(['/recuperar']);
  }
}