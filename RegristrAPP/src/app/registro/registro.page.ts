import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  apellido: string = '';
  escuela: string = '';
  carrera: string = '';
  rut: string = ''; // Variable para el RUT
  opcionesCarrera: string[] = []; // Array para las opciones de carrera

  constructor(private router: Router, private alertController: AlertController) {} // Inyecta AlertController

  async register() {
    // Verifica que se hayan proporcionado todos los datos necesarios antes de registrar al alumno
    if (this.nombre && this.apellido && this.escuela && this.carrera && this.rut) {
      // Combina las dos primeras letras del nombre, las dos primeras letras del apellido y los 3 primeros dígitos del RUT para formar el nombre de usuario
      const nombreUsuario = this.nombre.substring(0, 2) + this.apellido.substring(0, 2) + this.rut.substring(0, 3);
  
      // Combina los primeros 4 dígitos del RUT para usarlos como contraseña
      const password = this.rut.substring(0, 4);
  
      // Crea un objeto que contiene los datos del alumno
      const alumno = {
        nombre: this.nombre,
        apellido: this.apellido,
        escuela: this.escuela,
        carrera: this.carrera,
        rut: this.rut,
        nombreUsuario: nombreUsuario, // Nombre de usuario generado
        password: password, // La contraseña se obtiene de los primeros 4 dígitos del RUT
      };
  
      // Almacena los datos del alumno en el LocalStorage
      localStorage.setItem('alumno', JSON.stringify(alumno));
  
      // Muestra una alerta con el nombre de usuario y contraseña
      const mensaje = `Tu nombre de usuario es: ${nombreUsuario}\nTu contraseña es: ${password}`;
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: mensaje,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              // Después de que se cierre la alerta, redirige al usuario a la página de inicio para iniciar sesión
              this.router.navigate(['/home']);
            },
          },
        ],
      });

      await alert.present();
    } else {
      // Si faltan datos, muestra un mensaje de error o realiza la acción correspondiente
      console.error('Faltan datos obligatorios para el registro.');
    }
  }

  onEscuelaChange() {
    // Esta función se ejecuta cuando cambia la selección de escuela
    // Aquí puedes definir las opciones de carrera según la elección de la escuela
    if (this.escuela === 'Escuela de Salud') {
      this.opcionesCarrera = [
        'Técnico de Laboratorio Clínico y Banco de Sangre',
        'Técnico en Química y Farmacia',
        'Técnico en Odontología',
        'Técnico en Enfermería',
        'Técnico de Radiodiagnóstico y Radioterapia',
        'Informática Biomédica',
      ];
    } else if (this.escuela === 'Escuela de Ingeniería y Recursos Naturales') {
      this.opcionesCarrera = [
        'Técnico en Mecánica Automotriz y Autotrónica',
        'Técnico en Maquinaria y Vehículos Pesados',
        'Técnico en Mantenimiento Electromecánico',
        'Técnico en Energías Renovables',
        'Técnico en Electricidad y Automatización Industrial',
        'Ingeniería en Mecánica Automotriz y Autotrónica',
        'Ingeniería en Maquinaria y Vehículos Pesados',
        'Ingeniería en Electricidad y Automatización Industrial',
      ];
    } else if (this.escuela === 'Escuela de Informática y Telecomunicaciones') {
      this.opcionesCarrera = [
        'Analista Programador',
        'Ingeniería en Informática',
        'Ingeniería en Conectividad y Redes',
      ];
    } else {
      this.opcionesCarrera = []; // Reinicia las opciones de carrera si no se ha seleccionado una escuela válida
    }
  }
}