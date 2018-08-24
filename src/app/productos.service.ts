import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ProductosInterface } from './productosInterface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private cant_producto = new BehaviorSubject<number>(0);
  cast = this.cant_producto.asObservable();
  private nom_producto = new BehaviorSubject<string>("");
  cast_nom = this.nom_producto.asObservable();
  productosCollection: AngularFirestoreCollection<ProductosInterface>;
  nombre: ProductosInterface[];
  productos: Observable<ProductosInterface[]>;
  productoDoc: AngularFirestoreDocument<ProductosInterface>;

  product: ProductosInterface[];
  _id: string;
  idCant:string;
  cant:number;
  idAnad: string;
  total:number=0;
  nombres = [];
  nomTemp = [];

  constructor(public afs: AngularFirestore) {
    //this.productosImagenes = afsm.storage().ref();
    //this.productos = afs.collection('productos').valueChanges();
    this.productosCollection = afs.collection<ProductosInterface>('productos');
    console.log(this.productosCollection);
    this.nombre = [];
    this.product = [];
    this.productos = this.productosCollection.snapshotChanges().pipe(
      map(actions => actions.map(a =>{
          //const img = a.payload.doc.file;
          const data = a.payload.doc.data() as ProductosInterface;
          const id = a.payload.doc.id;
          const nombre = a.payload.doc.data().nombre;
          const precio = a.payload.doc.data().precio;
          const cantidad = a.payload.doc.data().cantidad;
          const imagen = a.payload.doc.data().imagen;
          //console.log(nombre, id, precio, cantidad, imagen);
          this.nombre.push({nombre: nombre});
          this.product.push({id: id, nombre: nombre, precio: precio, cantidad: cantidad, imagen: imagen});

          //console.log(this.product);
          //console.log(id);
          return {id, ...data};
      }))
    );
    console.log(this.productos);
    console.log(this.product);
    console.log(this.nombre);
  }

  //Obtengo en primera instancia el arreglo duplicado de la base de datos
  getProducts(){
    let products = this.product;
    let prod = this.removeDuplicates(products, "nombre");
    console.log(prod);
    return prod;
  }

  //Funcion para convertir el arreglo doble que me envía el mapeo de la base
  //de datos en un arrelo sin duplicados.
  removeDuplicates(originalArray, prop) {
     let newArray = [];
     let lookupObject  = {};

     for(let i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }


     for(let i in lookupObject) {
         newArray.push(lookupObject[i]);
     }

     return newArray;
  }

  getProductos(){
    //console.log(nombre);
    console.log(this.productos);
    return this.productos;
  }

  setId(id){
    this._id=id;
    console.log(this._id);
    //return this._id;
  }

  getId(){
    console.log(this._id);
    return this._id;
  }

  setCantidades(id, cantidad: number, idAnadir){
    this.idCant = id;
    this.cant = cantidad;
    this.idAnad = idAnadir;

    let idC = this.idCant.substr(5);
    let idA = this.idAnad.substr(7);
    console.log(this.idCant, this.cant, this.idAnad);
    console.log(idC, idA);

    if(idC == idA){
      this.shoppCartBadge();
      this.setIdProCart(idC);
    }else{
      console.log("Por favor añada la cantidad digitada");
    }
  }

  setIdProCart(nom){
    console.log(this.nombres);
    let cantidad = 0;
    let nombres=[];
    let boleano = false;
    console.log(this.nomTemp);
    this.nomTemp.forEach(temp=>{
      console.log(temp)
      if(temp==nom){
          boleano = true;
      }
    });
    console.log(boleano);
    this.nomTemp.push(nom);

    if(nom != "" && nom != undefined){
      console.log(nom);
      if(Object.keys(this.nombres).length === 0){
        this.nombres.push({
          nombre: nom,
          cantidad: this.cant
        });
      }else if(boleano){
        nombres = this.nombres;
        console.log(nombres);
        nombres.forEach((duplicado, index) => {
          console.log(duplicado.nombre);
          if(duplicado.nombre == nom){
            console.log(index);
            console.log(nom);
            console.log(this.cant);
            console.log(duplicado.cantidad);
            const cant = duplicado.cantidad;
            console.log(cant);
            //console.log(this.cant+duplicado.cantidad);
            cantidad = this.cant;
            console.log(cantidad);
            const cantid = cant + cantidad;
            console.log(cantid);

            console.log(this.nombres);

            this.nombres.splice(index, 1, {nombre: nom, cantidad: cantid} );
            console.log(this.nombres);
          }
        });
      }else{

        this.nombres.push({
          nombre: nom,
          cantidad: this.cant
        });
        console.log(this.nombres);
      }
    }else{
      this.nombres = [];
      this.cant = 0;
      this.total = 0;
      this.nomTemp = [];
    }
    console.log(this.nombres);
    //this.nom_producto.next(nom);
  }

  getProCart(){
    console.log(this.nombres);
    return this.nombres;
  }

  shoppCartBadge(){
    const total = this.total;
    console.log(this.cant, typeof(this.cant));
    this.total = total + this.cant;
    console.log(this.total, typeof(this.total));
    this.cant_producto.next(this.total);
    //this.editCantidadProductos(this.total);
    //this.getbadgeCart(this.total);
  }

  updateProductos(productos){
    console.log(productos);
    productos.forEach(element => {
      console.log(element);
      this.productoDoc = this.afs.doc(`productos/${element.id}`);
      console.log(this.productoDoc);
      this.productoDoc.update(element);
      console.log(this.productoDoc.update(element));
    })
  }

}
