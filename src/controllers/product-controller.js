'use-strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator')

exports.get = (req, res, next) =>{
    Product
    .find({active : true}, //Filtro
         'title price slug') //Campos a ser selecionados
    .then(data => {
        res.status(200).send(data);

    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getBySlug = (req, res, next) =>{
    Product
    .findOne({ slug : req.params.slug,
            active : true}, //Filtro
         'title description price slug tags') //Campos a ser selecionados
    .then(data => {
        res.status(200).send(data);

    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getById = (req, res, next) =>{
    Product
    .findById(req.params.id)
    .then(data => {
        res.status(200).send(data);

    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getByTag = (req, res, next) =>{
    Product
    .find({ tags : req.params.tag,
            active : true}, //Filtro
         'title description price slug tags') //Campos a ser selecionados
    .then(data => {
        res.status(200).send(data);

    }).catch(e => {
        res.status(400).send(e);
    });
}
exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, "O titulo deve conter pelo menos 3 caracters")
    var product = new Product(req.body);
    // or product.title = req.body.title; ETC
    product
    .save()
    .then(x => {
        res.status(201).send({message: 'Produto cadastrado com sucesso'});

    }).catch(e => {
        res.status(400).send({message: 'Falaha ao cadastrar produto',
        data: e});

    });
}

/*exports.put = (req, res, next) => {
    const id = req.params.id; //Pegar parametro da url
    res.status(200).send({ id: id,
        item: req.body
    });
}*/

exports.put = (req, res, next) => {
    Product
    .findByIdAndUpdate(req.params.id, {
        $set: { //Seto os valores que foram informados na requisição
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(x => {
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao atualizar produto',
            data: e
        });
    });
}

exports.delete = (req, res, next) => {
    Product
    .findOneAndRemove(req.body.id)
    .then(x => {
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao remover produto',
            data: e
        });
    });
}