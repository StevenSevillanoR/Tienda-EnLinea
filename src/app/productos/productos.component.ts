import { Component, OnInit } from '@angular/core';
import { ProductosInterface } from '../productosInterface';
import { ProductosService } from '../productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos = [];
  product = [];

  constructor(
    private productosService: ProductosService,
    public router: Router
  ) { }

  ngOnInit() {
    this.mostrarProducto();
  }

 mostrarProducto(){
   let prod=[];
   let id = this.productosService.getId();
   console.log(id);
   /*this.productosService.getProductos().subscribe(producto => {
     //this.productos = producto;
     this.product = producto;
     console.log(producto);
   });*/
   this.product = this.productosService.getProducts();
   console.log(this.product);
   let boleano = id != "" && id !== undefined;
   console.log(boleano);
   if (boleano){
     this.product.forEach(element=>{
       console.log(this.product);
       console.log(id);
       //this.productos = this.producto;
       if(id.includes(element.nombre)){
           console.log(id);
           console.log(element.nombre);
           prod.push({
             nombre: element.nombre,
             precio: element.precio,
             cantidad: element.cantidad,
             imagen: element.imagen
           })
           console.log(prod);
           this.productos = prod;
           //console.log(this.producto);
           console.log(this.productos);
         }else{
           console.log("No se encuentra ese producto en la base de datos");
         }
     });
     return this.productos;
   }else{
     console.log("Regrese al home y escoja un producto");
     return this.productos = [];
   }
 }

  onHome(){
    this.router.navigate(['/home']);
  }

}
