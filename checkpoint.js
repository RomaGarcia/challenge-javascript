// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las 
// implementaciones ya realizadas en las homeworks de 
// Queue, LinkedList y BinarySearchTree.
// Sobre dichas implementaciónes van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo.
// Pero todos los métodos ya implementados en las homeowrks no es 
// necesario que los vuelvan a definir.

const {
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
} = require('./DS.js');

// ----- Closures -----

// EJERCICIO 1
// Implementar la funcion 'exponencial' que recibe un parametro entero 'exp'
// y retorna una una funcion, nos referiremos a esta ultima como funcion hija,
// y a 'exponencial' como la funcion padre, la funcion hija debe de recibir 
// un parametro y retornar dicho parametro elevado al parametro 'exp' de 
// la funcion padre original 'exponencial'
// Ejemplo:
// > var sqrt = exponencial(2);
// > sqrt(2);
// < 4
// > sqrt(3);
// < 9
// > sqrt(4);
// < 16

function exponencial(exp) {
    return function(x){
        return  Math.pow(x,exp);
    }
}
//var sqrt = exponencial(2);
//console.log(sqrt(3));
// ----- Recursión -----

// EJERCICIO 2
// Crear la funcion 'direcciones':
// La funcion debe retornar un string de los movimientos Norte(N), Sur(S), Este(E), Oeste(O)
// que se deben realizar, para llegar al destino de un laberinto dado.
//
// Ejemplo: dado el siguiente laberinto:
// let laberintoExample = { // direccion = ""
//     N: 'pared',
//     S: { // direccion = "S"
//         N: 'pared',
//         S: 'pared',
//         E: { // direccion = "SE"
//             N: 'destino', // direccion = "SEN"
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         },
//         O: { // direccion = "SO"
//             N: 'pared',
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         }
//     },
//     E: 'pared',
//     O: 'pared'
// }
// El retorno de la funcion 'direcciones' debe ser 'SEN', ya que el destino se encuentra
// haciendo los movimientos SUR->ESTE->NORTE
// Aclaraciones: el segundo parametro que recibe la funcion ('direccion') puede ser pasado vacio (null)

function direcciones(laberinto) {
    var dir = '';
    for(var prop in laberinto){
        if(typeof laberinto[prop] == 'object'){
            dir += prop.toString();
            dir += direcciones(laberinto[prop])
        }
        else if(laberinto[prop] == 'destino'){
            dir += prop.toString();
        }
    } 
    return dir;
}


// EJERCICIO 3
// Crea la funcion 'deepEqualArrays':
// Dado que las comparaciones en javascript aveces son un problema como con el siguiente ejemplo:
// [0,1,2] === [0,1,2] => false // puede probarlo en la consola
// con objetos o arrays identicos surge la necesidad de comparar en 'profundidad' arrays u objetos
// en este caso la funcion solo va a ser pensada para recibir arrays,
// pero estos pueden tener multiples niveles de anidacion, y la funcion deepEqualArrays debe
// comparar cada elemento, sin importar la profundidad en la que este
// Ejemplos: 
// deepEqualArrays([0,1,2], [0,1,2]) => true
// deepEqualArrays([0,1,2], [0,1,2,3]) => false
// deepEqualArrays([0,1,[[0,1,2],1,2]], [0,1,[[0,1,2],1,2]]) => true

function deepEqualArrays(arr1, arr2) {
    var state = true;

    if(arr1.length != arr2.length) {
        state = false;
        return state;
    }

    for(let i=0 ; i<arr1.length ; i++){
        if(Array.isArray(arr1[i]) && Array.isArray(arr2[i])){
            state = deepEqualArrays(arr1[i],arr2[i]);
            if(state === false) return false;
        }
        else if(arr1[i] != arr2[i]) {
            state = false;
            return state;
        }
        else if(typeof arr1[i] !== typeof arr2[i]){
            state = false;
            return state;
        } 
    }
    state = true;
    return state;
}



// ----- LinkedList -----

// Deben completar la siguiente implementacion 'OrderedLinkedList'(OLL)
// que es muy similar a las LinkedList vistas en clase solo que 
// los metodos son distintos y deben de estar pensados para conservar la lista
// ordenada de mayor a menor.
// ejemplos:
// head --> 5 --> 3 --> 2 --> null
// head --> 4 --> 3 --> 1 --> null
// head --> 9 --> 3 --> -1 --> null
// Las dos clases principales ya van a estar implementadas a continuacion:
function OrderedLinkedList() {
    this.head = null;
}
// notar que Node esta implementado en el archivo DS

// Y el metodo print que permite visualizar la lista:
OrderedLinkedList.prototype.print = function(){
    let print = 'head'
    let pointer = this.head
    while (pointer) {
        print += ' --> ' + pointer.value
        pointer = pointer.next;
    }
    print += ' --> null'
    return print
}


// EJERCICIO 4
// Crea el metodo 'add' que debe agregar nodos a la OLL de forma que la misma se conserve ordenada:
// Ejemplo:
// > LL.print()
// < 'head --> null'
// > LL.add(1)
// > LL.print()
// < 'head --> 1 --> null'
//    2       c
// > LL.add(5)
// > LL.print()
// < 'head --> 5 --> 1 --> null'
// > LL.add(4)
// > LL.print()
// < 'head --> 5 --> 3 --> 1 --> null'
//               4
OrderedLinkedList.prototype.add = function(val){
    var current = this.head;
    var ant = null;
    var node = new Node(val);

    if(!current){
        this.head = node
        return;
    }

    while( current){
        if(val <= current.value ){
            ant = current;
            current = current.next;
        }
        else{
            if( ant ){
                node.next = current;
                ant.next = node;
                return;
            }
            node.next = current; //current == this.head
            current = node; //current == this.head
            return;
        }
    }
    ant.next = node;
    /*var current = this.head;
    if(!current){
        this.head = new Node(val);
        return;
    }
    if(!current.next && val <= current.value){
        current.next = new Node(val);
        return;
    }
    if(current.next && val <= current.next.value){
        let ant2 = current.next;
        current.next = new Node(val);
        current.next.next = ant2;
        return;
    }

    while(current.next.next){ //esto no anda bien cuando tengo mas de 3 valores
        current = current.next;
    }
    if(val <= current.value)
    var ant = current.next;
    current.next = new Node(val);
    current.next.next = ant;*/

}


// EJERCICIO 5
// Crea el metodo 'removeHigher' que deve devolver el valor mas alto de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeHigher = function(){
    var current = this.head;
    var remove = null;
    var max = 0;
    var rem = 0;
    if(!current) return null;

    while(current){
        if(current.value > max){
            max = current.value;
            remove = current;
        }
        current = current.next;
    }
    current = this.head;
    if(this.head == remove){
        rem = remove.value;
        this.head = remove.next;
        return rem;
    }
    while( current.next != remove && current ) current = current.next;
    if(current){
        current.next = current.next.next;
        rem = remove.value;
        remove = null;
        return rem;
    }
}


// EJERCICIO 6
// Crea el metodo 'removeLower' que deve devolver el valor mas bajo de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeLower = function(){
    var current = this.head;
    var remove = null;
    var min = 1000;
    var rem = 0;
    if(!current) return null;
    while(current){
        if(current.value < min){
            min = current.value;
            remove = current;
        }
        current = current.next;
    }
    current = this.head;
    if(this.head == remove){
        rem = remove.value;
        this.head = remove.next;
        return rem;
    }
    while( current.next != remove && current ) current = current.next;

    if(current){
        current.next = null;
        rem = remove.value;
        remove = null;
        return rem;
    }
}



// ----- QUEUE -----

// EJERCICIO 7
// Implementar la funcion multiCallbacks:
// la funcion multiCallbacks recibe dos arrays de objetos cuyas propiedades son dos,
// 'cb' que es una funcion, y 'time' que es el tiempo estimado de ejecucion de dicha funcion 
// este ultimo representado con un integer como se muestra acontinuacion:
// let cbsExample = [
//     {cb:function(){}, time: 2},
//     {cb:function(){}, time: 3}
// ]
// De manera que lo que nuestra funcion 'multiCallbacks' debe de ir ejecutando las funciones 
// sin pasarle parametros pero debe ir alternando las funciones de cbs1 y cbs2 
// segun cual de estas se estima que tarde menos, retornando un arreglo de resultados
// de las mismas en el orden que fueron ejecutadas
// Ejemplo:
// > let cbs1 = [
//       {cb:function(){return '1-1'}, time: 2},
//       {cb:function(){return '1-2'}, time: 3}
//   ];
// > let cbs2 = [
//       {cb:function(){return '2-1'}, time: 1},
//       {cb:function(){return '2-2'}, time: 4}
//   ];
// > multiCallbacks(cbs1, cbs2);
// < ["2-1", "1-1", "1-2", "2-2"];

function multiCallbacks(cbs1, cbs2){
    let aux = 0;
    let arr = [];
    for(let i=0 ; i<cbs2.length ; i++){
        cbs1.push(cbs2[i]);
    }

    for(let i=0 ; i<cbs1.length-1 ; i++){
        for(let j=0 ; j<cbs1.length-1-i ; j++){
            if( cbs1[j].time > cbs1[j+1].time){
                aux = cbs1[j];
                cbs1[j] = cbs1[j+1];
                cbs1[j+1] = aux
            }
        }
    }
    for(let i=0 ; i<cbs1.length ; i++){
        arr.push(cbs1[i].cb());
    }
    return arr;
}



// ----- BST -----

// EJERCICIO 8
// Implementar el metodo 'toArray' en el prototype del BinarySearchTree
// que devuelva los valores del arbol en una array ordenado
// Ejemplo:
//     32
//    /  \
//   8   64
//  / \
// 5   9
// resultado:[5,8,9,32,64]

BinarySearchTree.prototype.toArray = function(arr = []) {
    arr.push(this.value);
    this.left && this.left.toArray(arr);
    this.right && this.right.toArray(arr);

    return arr.sort(function(a,b){return a-b});
    /*var testArr= [];
    testArr.push(this.depthFirstForEach(function(val){ testArr.push(val); }));
    return testArr.sort(function(a,b){return a-b});;*/
}



// ----- Algoritmos -----

// Ejercicio 9
// Implementar la funcion 'primalityTest' que dado un valor numerico entero
// debe de retornar true or false dependiendo de si este es primo o no.
// Puede que este es un algoritmo que ya hayan implementado pero entenderan
// que es un algoritmo que segun la implementacion puede llegar a ser muy costoso
// para numeros demasiado grandes, asi que vamos a implementarlo mediante un metodo
// derivado de Trial Division como el que se muestra aca:
// https://en.wikipedia.org/wiki/Primality_test
// Si bien esta no es la mejor implementacion existente, con que uds puedan 
// informarse sobre algoritmos, leerlos de un pseudocodigo e implemnterlos alcanzara

function primalityTest(num) {
    if (num <= 3) return num > 1;
  
  if ((num % 2 === 0) || (num % 3 === 0)) return false;
  
  let count = 5;
  
  while (Math.pow(count, 2) <= num) {
    if (num % count === 0 || num % (count + 2) === 0) return false;
    
    count += 6;
  }
  
  return true;
}


// EJERCICIO 10
// Implementa el algoritmo conocido como 'quickSort', que dado un arreglo de elemntos
// retorn el mismo ordenado de 'mayor a menor!'
// https://en.wikipedia.org/wiki/Quicksort

function quickSort(array) {
    if (array.length <= 1) {
        return array;
      }
    
      var pivot = array[0];
      
      var left = []; 
      var right = [];
    
      for (var i = 1; i < array.length; i++) {
        array[i] > pivot ? left.push(array[i]) : right.push(array[i]);
      }
    
      return quickSort(left).concat(pivot, quickSort(right));
}
// QuickSort ya lo conocen solo que este 
// ordena de mayor a menor
// para esto hay que unir como right+mid+left o cambiar el 
// signo menor en la comparacion con el pivot




// ----- EXTRA CREDIT -----

// EJERCICIO 11
// Implementa la función 'reverse', que recibe un numero entero como parametro
// e invierte el mismo.
// Pero Debería hacer esto sin convertir el número introducido en una cadena, o un array
// Ejemplo:
// > reverse(123);
// < 321
// > reverse(95823);
// < 32859

function reverse(numero){
    var invertido = 0
    var resto = numero
    do {
      invertido = invertido * 10 + (resto % 10)
      resto = Math.floor(resto / 10)
    } while ( resto > 0 )
    return invertido
}
// la grandiosa resolucion de Wilson!!!
// declaran una variable donde 
// almacenar el el numero invertido
// y van multiplicando por 10 la 
// porcion del numero que ya invirtieron
// deforma que esta se corra hacia la izq
// para agregar el ultimo numero de la 
// porcion no revertida
// y luego le quitan a la porcion 
// no revertida el ultimo numero

module.exports = {
    exponencial,
    direcciones,
    deepEqualArrays,
    OrderedLinkedList,
    multiCallbacks,
    primalityTest,
    quickSort,
    reverse,
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
}