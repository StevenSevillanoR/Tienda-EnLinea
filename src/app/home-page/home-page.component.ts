import { Component, OnInit } from '@angular/core';
import { ProductosInterface } from '../productosInterface';
import { ProductosService } from '../productos.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
//import { ProductosComponent } from '../productos/productos.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  productos: ProductosInterface[];
  //producto: ProductosInterface[];
  //nom: string;
  //private url: any;
  producto = [];

  product = [];

  cant:number;
  _id:string;
  cantidad:number;
  idAnad: string;
  editCantidadProductos: number;
  textoBusqueda:string;

  constructor(
    public productosService: ProductosService,
    public flashMensaje: FlashMessagesService,
    public router: Router
    //public productosComponent: ProductosComponent
  ) { }

  ngOnInit() {
    //this.productosService.cast.subscribe(cant => this.cant = cant);
    let nombre = "";
    this.productosService.getProductos().subscribe(producto=>{
      //this.productos = producto;
      this.producto = producto;
      this.product = producto;
      console.log(this.product);
      console.log(this.producto);
      //console.log(nom);
    });
    this.getInit(nombre);
    //console.log(nom);
    //let nom: string;
  }

  getInit(nom){
    //nom = nombre;
    let product=[];
    console.log(nom);
    let prod=[];
    //this.busquedaNom = [];
    this.productosService.getProductos().subscribe(producto=>{
      this.productos = producto;
      this.producto = producto;
      product = producto;
      //console.log(product);
      //console.log(producto);
      //console.log(nom);
    });
    console.log(this.producto);
    let boleano = nom != "";
    console.log(boleano);
    if(nom != ""){
      this.productos = this.producto;
      console.log(this.productos);
      this.productos.forEach(element=>{
        //this.productos = this.producto;
        let nomArr = element.nombre.toLowerCase().replace(/\u00E1/g, "a");
        let nomBus = nom.toLowerCase().replace(/\u00E1/g, "a");
        console.log(nomArr);
        console.log(nomBus);
        if(nomArr.includes(nomBus)){
            console.log(nom);
            console.log(element.nombre);
            prod.push({
              nombre: element.nombre,
              precio: element.precio,
              cantidad: element.cantidad,
              imagen: element.imagen
            })
            console.log(prod);
            this.productos = prod;
            console.log(this.producto);
            console.log(this.productos);
          }else{
            console.log("No se encuentra ese producto en la base de datos");
            //console.log(productos);
            //prod = productos;
            //this.busquedaNom = prod;
            //console.log(this.busquedaNom);
          }

      });
      if(Object.keys(this.productos).length === 0){
        this.flashMensaje.show('No se encuentra ese producto en la base de datos. Por favor intente nuevamente!!', {cssClass: 'alert-danger', timeout: 4000});
      }
      //console.log(this.textoBusqueda);
      return this.productos = prod;
    }else{
      this.producto = this.productosService.getProducts();
      console.log(this.producto);
      return this.productos = this.producto;
    }
  }

  /*editTheProducts(){
    this.productosService.editCantidadProductos(this.editCantidadProductos);
  }*/

  cantidades(id, cantidad){
    this._id = id;
    let cant = cantidad;
    this.cantidad = Number(cant);
    console.log(this._id, this.cantidad);
  }

  anadirProductos(){
    console.log(this.cantidad, typeof(this.cantidad));
    //this.editTheProducts();
    this.productosService.setCantidades(this._id, this.cantidad, this.idAnad);
  }

  writeData = nombre => {
    console.log(nombre.target.value);
    let nom = nombre.target.value;
    this.textoBusqueda = nom;
    console.log(nom);
    this.getInit(nom);
  }

  onVerMas = id => {
    console.log(id.target.id);
    this.productosService.setId(id.target.id);
    let verMasId = this.productosService.getId();
    console.log(verMasId);
    this.router.navigate(['/producto']);
  }

  onAnadir = id => {
    console.log(id.target.id);
    this.productosService.setId(id.target.id);
    //let anadirId = this.productosService.getId();
    this.idAnad = id.target.id;
    console.log(this.idAnad);
    this.anadirProductos();
  }

  onCantidad = cantidad => {
      console.log(cantidad.target.value);
      console.log(cantidad.target.id);
      let cant = cantidad.target.value;
      let idCant = cantidad.target.id;
      this.cantidades(idCant, cant);
  }

}
