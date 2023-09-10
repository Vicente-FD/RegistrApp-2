import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importa Router para la redirección

@Component({
  selector: 'app-recuperar',
  templateUrl: 'recuperar.page.html',
  styleUrls: ['recuperar.page.scss'],
})
export class RecuperarPage {
  usuario: string = '';
  password: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router // Inyecta el servicio Router
  ) {}

  async recuperarPassword() {
    // Obtén el usuario del almacenamiento local
    const usuarioGuardado = localStorage.getItem('alumno');
    if (!usuarioGuardado) {
      this.mostrarAlerta('Usuario no encontrado', 'El usuario ingresado no existe.');
      return;
    }

    // Convierte el usuario guardado de JSON a objeto
    const usuarioObj = JSON.parse(usuarioGuardado);

    // Verifica si el usuario ingresado coincide con el usuario guardado
    if (this.usuario === usuarioObj.nombreUsuario) {
      // Si coincide, muestra la contraseña en una alerta
      this.mostrarAlerta('Contraseña', `Tu contraseña es: ${usuarioObj.password}`);
    } else {
      // Si no coincide, muestra un mensaje de error
      this.mostrarAlerta('Usuario incorrecto', 'El usuario ingresado no coincide.');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirige al usuario a la página de inicio (home)
            this.router.navigate(['/home']);
          },
        },
      ],
    });

    await alert.present();
  }
}