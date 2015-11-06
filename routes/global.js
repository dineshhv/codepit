var app = express();

var middleware = {

    render: function (view) {
        return function (req, res, next) {
            res.render(view);
        }
    },

    globalLocals: function (res, req, next) {
        res.locals({ 
            siteTitle: 'My Website's Title',
            pageTitle: 'The Root Splash Page',
            author: 'Cory Gross',
            description: 'My app's description',
        });
        next();
    },

    index: function (req, res, next) {
        res.locals({
            indexSpecificData: someData
        });
        next();
    }

};

app.use(middleware.globalLocals);
app.get('/', middleware.index, middleware.render('home'));
app.get('/products', middleware.products, middleware.render('products'));