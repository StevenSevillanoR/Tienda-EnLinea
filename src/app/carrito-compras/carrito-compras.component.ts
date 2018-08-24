import { Component, OnInit } from '@angular/core';
import { ProductosInterface } from '../productosInterface';
import { ProductosService } from '../productos.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  product = [];
  productos = [];
  nombres = [];
  prod = [];
  total:number=0;

  constructor(
    private productosService: ProductosService,
    public router: Router
  ) { }

  ngOnInit() {

    /*this.productosService.cast_nom.subscribe(id => {

      console.log(id);
    });*/

    //let id = this.productosService.getIdProCart();
    //console.log(id);
    this.prod = [];

    this.nombres = this.productosService.getProCart();
    this.product = this.productosService.getProducts();
    console.log(this.product);
    console.log(this.nombres);
    this.nombres.forEach(elemento =>{
      this.product.forEach(element=>{
        //console.log(this.product);
        //console.log(elemento.nombre);
        //console.log(element.nombre);
        //this.productos = this.producto;
        if(elemento.nombre == element.nombre){
            //console.log(id);
            //console.log(element.nombre);
            this.prod.push({
              nombre: elemento.nombre,
              precio: element.precio,
              cantidad: elemento.cantidad,
              imagen: element.imagen,
              subtotal: element.precio*elemento.cantidad
            })
            //console.log(typeof(element.precio, elemento.cantidad));
            console.log(this.prod);
            this.productos = this.prod;
            //console.log(this.producto);
            console.log(this.productos);
          }else{
            console.log("No se encuentra ese producto en la base de datos");
          }
      });
    });
    this.productos.forEach(element=>{
      this.total +=element.subtotal;
    });
    console.log(this.total, this.productos);
    return this.productos;
  }

  onHome(){
    this.router.navigate(['/home']);
  }

  limpiarCompra(){
    this.total = 0;
    this.productos = [];
    this.prod = [];
    this.productosService.setIdProCart("");
    this.productosService.setCantidades("",0,"");
    this.router.navigate(['/home']);
  }

  pagar(){
    let pActualizados = [];
    console.log(this.productos);
    console.log(this.product);
    this.product.forEach(element =>{
      this.productos.forEach(elemento=>{
        if(element.nombre == elemento.nombre){
          pActualizados.push({
            id: element.id,
            nombre: element.nombre,
            precio: element.precio,
            cantidad: element.cantidad - elemento.cantidad,
            imagen: element.imagen
          });
        console.log(pActualizados);
        }else{
          console.log("No se ha actualizado el producto");
        }
      });
    });

    console.log(pActualizados);

    this.productosService.updateProductos(pActualizados);

    swal("Pago exitoso", "Compra realizada satisfactoriamente!!", "success");
    this.total = 0;
    this.productos = [];
    this.prod = [];
    this.productosService.setIdProCart("");
    this.productosService.setCantidades("",0,"");

    this.router.navigate(['/home']);
  }

}
