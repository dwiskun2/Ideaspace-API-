const Joi = require('joi');

module.exports = {
    validateParam: (schema, name) => {
        return (req, res, next) => {
            console.log('req.params', req.params);
            const result = Joi.validate({ param: req['params'][name]}, schema);
            if (result.error) {
                //Error Happened
                return res.status(400).json(result.error);
            } else {
                if(!req.value)
                req.value = {};

                if(!req.value['params'])
                req.value['params'] = {};

                req.value['params'][name] =  result.value.param;
                next();
            }
        }
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);

            if(result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                req.value = {};

                if(!req.value['body'])
                req.value['body'] = {};

                req.value['body'] = result.value;
                next();
            }
        }
    },


    schemas: {
        categorySchema: Joi.object().keys({
            products: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            events: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            donations: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            nama_category: Joi.string().required()
        }),

        categoryOptionalSchema: Joi.object().keys({
            nama_category: Joi.string()
        }),

        eventSchema: Joi.object().keys({
            nama_organisasi: Joi.string().required(),
            logo_organisasi: Joi.string().required()
        }),

        eventOptionalSchema: Joi.object().keys({
            nama_organisasi: Joi.string(),
            logo_organisasi: Joi.string()
        }),

        categoryProductSchema: Joi.object().keys({
            title: Joi.string().required(),
            foto_product: Joi.string().required(),
            deskripsi_product: Joi.string().required(),
            rincian_product: Joi.string().required(),
            jumlah_views: Joi.number()

        }),

        userSchema: Joi.object().keys({
    
            nama: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            biodata: Joi.string(),
            tanggal_lahir: Joi.date(),
            jenis_kelamin: Joi.string(),
            foto_user: Joi.string(),
            resetLink: Joi.string(),
            isAdmin: Joi.boolean(),
            active: Joi.boolean()

        }),

        userOptionalSchema: Joi.object().keys({
            nama: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string(),
            biodata: Joi.string(),
            tanggal_lahir: Joi.date(),
            jenis_kelamin: Joi.string(),
            foto_user: Joi.string(),
            resetLink: Joi.string(),
            isAdmin: Joi.boolean(),
            active: Joi.boolean()
        }),

        bankSchema: Joi.object().keys({
            nama_bank: Joi.string().required(),
            no_rekening: Joi.number().required(),
            logo_bank: Joi.string().required()
        }),

        bankOptionalSchema: Joi.object().keys({
            nama_bank: Joi.string(),
            no_rekening: Joi.number(),
            logo_bank: Joi.string()
        }),

        donationSchema: Joi.object().keys({
            jumlah_nominal_donasi: Joi.number().required(),
            target_nominal_donasi: Joi.number().required(),
            date_donasi: Joi.date().required()
        }),

        donationOptionalSchema: Joi.object().keys({
            jumlah_nominal_donasi: Joi.number(),
            target_nominal_donasi: Joi.number(),
            date_donasi: Joi.date()
        }),

        testimonySchema: Joi.object().keys({
            nama: Joi.string().required(),
            nama_organisasi: Joi.string().required(),
            deskripsi_testimoni: Joi.string().required(),
            foto_user: Joi.string().required()
        }),

        testimonyOptionalSchema: Joi.object().keys({
            nama: Joi.string(),
            nama_organisasi: Joi.string(),
            deskripsi_testimoni: Joi.string(),
            foto_user: Joi.string()
        }),

        eventProductSchema: Joi.object().keys({
            title: Joi.string().required(),
            foto_product: Joi.string().required(),
            deskripsi_product: Joi.string().required(),
            rincian_product: Joi.string().required(),
            jumlah_views: Joi.number()

        }),

        donationProductSchema: Joi.object().keys({
            title: Joi.string().required(),
            foto_product: Joi.string().required(),
            deskripsi_product: Joi.string().required(),
            rincian_product: Joi.string().required(),
            jumlah_views: Joi.number()

        }),

        userTransactionSchema: Joi.object().keys({
            nominal_transaksi: Joi.number().required()
        }),

        bankTransactionSchema: Joi.object().keys({
            nominal_transaksi: Joi.number().required()
        }),

        donationTransactionSchema: Joi.object().keys({
            nominal_transaksi: Joi.number().required()
        }),

        productSchema: Joi.object().keys({
            categories: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            events: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            donations: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            title: Joi.string().required(),
            foto_product: Joi.string().required(),
            deskripsi_product: Joi.string().required(),
            rincian_product: Joi.string().required(),
            jumlah_views: Joi.number()

        }),

        transactionSchema: Joi.object().keys({
            users: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            banks: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            donations: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            nominal_transaksi: Joi.number().required()

        }),

        putProductSchema: Joi.object().keys({
            title: Joi.string().required(),
            foto_product: Joi.string().required(),
            deskripsi_product: Joi.string().required(),
            rincian_product: Joi.string().required(),
            jumlah_views: Joi.number()

        }),

        patchProductSchema: Joi.object().keys({
            categories: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            events: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            donations: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            title: Joi.string(),
            foto_product: Joi.string(),
            deskripsi_product: Joi.string(),
            rincian_product: Joi.string(),
            jumlah_views: Joi.number()

        }),

        putTransactionSchema: Joi.object().keys({
            nominal_transkasi: Joi.number().required()

        }),

        patchTransactionSchema: Joi.object().keys({
            nominal_transkasi: Joi.number()

        }),


    idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}

