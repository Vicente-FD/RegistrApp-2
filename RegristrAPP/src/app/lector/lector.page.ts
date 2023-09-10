import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserMultiFormatReader, Result, BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-lector',
  templateUrl: 'lector.page.html',
  styleUrls: ['lector.page.scss'],
})
export class LectorPage implements OnInit {
  qrResult: string = ''; // Variable para almacenar el resultado del escaneo de QR
  codeReader: BrowserMultiFormatReader;
  isScanning: boolean = false; // Variable para rastrear si el escáner está activo
  userData: {
    nombre: string;
    apellido: string;
    escuela: string;
    carrera: string;
    rut: string;
    datosEscaneados?: string[]; // Agrega datosEscaneados con el operador '?' para que sea opcional
  } = {
    nombre: '',
    apellido: '',
    escuela: '',
    carrera: '',
    rut: '',
  };// Inicializa 'userData' con propiedades predeterminadas

  @ViewChild('videoElement', { static: true }) videoElement: ElementRef | undefined;

  constructor() {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngOnInit() {
    this.getUserInfo(); // Cargamos los datos del alumno al inicio
  }

  openScanner() {
    if (this.videoElement) {
      // Define las opciones del escáner, como el formato de código QR que deseas escanear
      const hints = new Map<BarcodeFormat, any>();
      hints.set(BarcodeFormat.QR_CODE, {});

      // Inicia el escáner
      this.codeReader
        .decodeFromInputVideoDevice(undefined, this.videoElement.nativeElement)
        .then((result: Result) => {
          // Cuando se escanea un código QR, esto se ejecuta
          this.qrResult = result.getText(); // Almacena el resultado del escaneo

          // Divide los datos escaneados por comas
          const datosEscaneados = this.qrResult.split(',');

          // Combina los datos escaneados con los datos del alumno en una sola estructura
          this.userData = {
            ...this.userData,
            datosEscaneados: datosEscaneados,
          };

          // Guarda todo en el Local Storage
          localStorage.setItem('userData', JSON.stringify(this.userData));

          this.isScanning = false; // Detiene el escáner
          this.getUserInfo(); // Llama a getUserInfo() después de obtener los datos escaneados
        })
        .catch((error: any) => {
          console.error(error);
          this.isScanning = false; // Detiene el escáner en caso de error
        });

      this.isScanning = true; // Inicia el escáner y muestra la visualización de video
    }
  }

  closeScanner() {
    // Detén el escáner
    this.codeReader.reset();
    this.qrResult = ''; // Restablece el resultado
  }

  getUserInfo() {
    // Obtén la información del usuario desde el Local Storage
    const userInfoString = localStorage.getItem('alumno');
    
    if (userInfoString) { // Verifica si userInfoString no es nulo
      const userInfo = JSON.parse(userInfoString);
  
      // Combina los datos del alumno y los datos escaneados en 'userData'
      this.userData = {
        ...this.userData, // Mantén los datos anteriores en 'userData'
        ...userInfo, // Agrega los datos del alumno
        datosEscaneados: this.qrResult.split(','), // Agrega los datos escaneados
      };
    }
  }
}