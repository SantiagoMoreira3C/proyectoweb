const express = require('express');
const router =  express();


//invoncando el archivo de conexión de la BD

const conexion = require('./database/db');

router.get('/sistema' ,(req, res)=>{
    res.render('sistema');
});


//PARTE DEL LOGIN
router.get('/index' ,(req, res)=>{
    res.render('index');
});


//PARTE DEL LOGIN
router.get('/login' ,(req, res)=>{
    res.render('login');
});


//PARTE DEL REGISTRO
router.get('/registro' ,(req, res)=>{
             res.render('registro');
});

router.get('/productolista' ,(req, res)=>{
    conexion.query('SELECT * FROM producto', (error, results)=>{
       if(error){
           throw error;
       } else{
            res.render('productolista', {results:results});
       }
   }) 
});



/*MOSTRAR PROVEEDOR DEL NEGOCIO ASADERO DE POLLO*/
router.get('/proveedorlista' ,(req, res)=>{
     conexion.query('SELECT * FROM proveedor', (error, results)=>{
        if(error){
            throw error;
        } else{
             res.render('proveedorlista', {results:results});
        }
    }) 
});

/*MOSTRAR COMPRAS DEL NEGOCIO ASADERO DE POLLO*/
router.get('/compralista' ,(req, res)=>{
    conexion.query('SELECT * FROM compra', (error, results)=>{
       if(error){
           throw error;
       } else{
            res.render('compralista', {results:results});
       }
   }) 
});


/*CREAR PROVEEDOR DEL NEGOCIO ASADERO DE POLLO*/

router.get('/proveedoringreso' , (req, res)=>{
            res.render('proveedoringreso');
}) ;

/*CREAR NUEVO PRODUCTO DEL NEGOCIO ASADERO DE POLLO*/

router.get('/productoingreso' , (req, res)=>{
    res.render('productoingreso');
}) ;

/*CREAR NUEVA ORDEN DE COMPRA DEL NEGOCIO ASADERO DE POLLO*/

router.get('/compraingreso' , (req, res)=>{
    res.render('compraingreso');
}) ;




/* EDITAR REGISTRO DE PROVEEDOR*/

router.get('/proveedoreditar/:proveedorreferencia', (req, res)=>{
    const proveedorreferencia= req.params.proveedorreferencia;
    conexion.query('SELECT * FROM proveedor WHERE proveedorreferencia=?',[proveedorreferencia], (error, results)=>{
        if(error){
            throw error;
        } else{
             res.render('proveedoreditar', {proveedornombre:results[0]});
       
        }
    }) 
});

/* EDITAR PRODUCTO DE PROVEEDOR*/

router.get('/productoeditar/:productoreferencia', (req, res)=>{
    const productoreferencia= req.params.productoreferencia;
    conexion.query('SELECT * FROM producto WHERE productoreferencia=?',[productoreferencia], (error, results)=>{
        if(error){
            throw error;
        } else{
             res.render('productoeditar', {productonombre:results[0]});
       
        }
    }) 
});



/* EDITAR COMPRA */

router.get('/compraeditar/:comprareferencia', (req, res)=>{
    const comprareferencia= req.params.comprareferencia;
    conexion.query('SELECT * FROM compra WHERE comprareferencia=?',[comprareferencia], (error, results)=>{
        if(error){
            throw error;
        } else{
             res.render('compraeditar', {compranombre:results[0]});
       
        }
    }) 
});

/*formulario de ingreso de usuario*/


/* ELIMINAR REGISTRO DE PROVEEDOR*/
router.get('/proveedoreliminar/:proveedorreferencia', (req, res)=>{
    const proveedorreferencia= req.params.proveedorreferencia;
    conexion.query('DELETE FROM proveedor WHERE proveedorreferencia = ?',[proveedorreferencia], (error, results)=>{
        if(error){
            throw error;
        } else{
             res.redirect('/proveedorlista');
        }
    }) 
});

/* ELIMINAR PRODUCTO */
router.get('/productoeliminar/:productoreferencia', (req, res)=>{
    const productoreferencia= req.params.productoreferencia;
    conexion.query('DELETE FROM producto WHERE productoreferencia = ?',[productoreferencia], (error, results)=>{
        if(error){
            throw error;
        } else{
             res.redirect('/productolista');
        }
    }) 
});


/* ELIMINAR COMPRA */
router.get('/compraeliminar/:comprareferencia', (req, res)=>{
    const comprareferencia= req.params.comprareferencia;
    conexion.query('DELETE FROM compra WHERE comprareferencia = ?',[comprareferencia], (error, results)=>{
        if(error){
            throw error;
        } else{
             res.redirect('/compralista');
        }
    }) 
});



const crud = require('./controllers/crud');
router.post('/proveedoringreso', crud.proveedoringreso);
router.post('/proveedoreditar', crud.proveedoreditar);
router.post('/registro', crud.registro);
router.post('/login', crud.login);
router.post('/productoingreso', crud.productoingreso);
router.post('/productoeditar', crud.productoeditar);
router.post('/compraingreso', crud.compraingreso);
router.post('/compraeditar', crud.compraeditar);


module.exports = router;