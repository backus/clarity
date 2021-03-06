require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Load environment variables from .env for local development.
 */
const R = __webpack_require__(0)
const {TEST_ENVS, getEnvVariables} = __webpack_require__(2)

const env = getEnvVariables()

module.exports = {
  port: env.PORT,
  host: env.HOST,
  env: env.NODE_ENV,
  database_url: env.DATABASE_URL,
  sentry_dsn: env.SENTRY_DSN,

  /** Passport **/
  clientID: env.FB_CLIENT_ID,
  clientSecret: env.FB_CLIENT_SECRET,
  callbackURL: env.FB_CALLBACK_URL,

  /*******************************************************************
   *** The db object is used by Sequelize to configure migrations. ***
   *******************************************************************/
  db: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    timezone: '+00:00',
    logging: !R.contains(env.NODE_ENV, TEST_ENVS) && console.info,
  },
}



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var R = __webpack_require__(0);
var path = __webpack_require__(6);
var chalk = __webpack_require__(7);
var dotenv = __webpack_require__(59);
var envFile = '.env';
var HEROKU_ENVS = ['heroku-develop', 'heroku-stage', 'heroku-live', 'heroku-tests'];
var LOCAL_ENVS = ['test', 'local-develop'];
var TEST_ENVS = ['test', 'ci', 'heroku-tests'];
var ALL_ENVS = R.pipe(R.concat(HEROKU_ENVS), R.concat(LOCAL_ENVS), R.concat(TEST_ENVS), R.uniq)([]);
var getEnvVariables = function () {
    var fromDotenv = dotenv.config({ path: path.resolve(envFile) });
    if (fromDotenv.error) {
        console.warn(chalk.yellow("No config file was found at " + fromDotenv.error.path));
        return process.env;
    }
    var result = R.merge(fromDotenv.parsed, {
        NODE_ENV: process.env.NODE_ENV
    });
    var testEnv = R.contains(result.NODE_ENV, TEST_ENVS);
    var mismatchNODE_ENV = fromDotenv.parsed.NODE_ENV !== process.env.NODE_ENV;
    if (mismatchNODE_ENV && !testEnv) {
        console.info(chalk.yellow("WARNING: " + envFile + " specifies NODE_ENV=" + fromDotenv.parsed.NODE_ENV + ", " + ("but it be overriden by NODE_ENV=" + process.env.NODE_ENV)));
    }
    var supportedEnv = R.contains(result.NODE_ENV, ALL_ENVS);
    if (!supportedEnv) {
        console.error(chalk.red("NODE_ENV \"" + result.NODE_ENV + "\" is not supported. \n") + chalk.grey("Please provide one of: " + JSON.stringify(ALL_ENVS)));
        throw Error('Invalid environment');
    }
    if (!testEnv) {
        console.info(chalk.green('Environment variables loaded from .env:'));
        console.info(chalk.grey(JSON.stringify(result, null, 2)));
    }
    return result;
};
module.exports = {
    HEROKU_ENVS: HEROKU_ENVS,
    LOCAL_ENVS: LOCAL_ENVS,
    TEST_ENVS: TEST_ENVS,
    getEnvVariables: getEnvVariables
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var cls = __webpack_require__(58);
var Sequelize = __webpack_require__(8);
var user_1 = __webpack_require__(32);
var post_1 = __webpack_require__(31);
var iteration_1 = __webpack_require__(30);
var config_1 = __webpack_require__(29);
var database_url = __webpack_require__(1).database_url;
var Database = function () {
    function Database() {
        var _this = this;
        this.getModels = function () {
            return _this.models;
        };
        this.getSequelize = function () {
            return _this.sequelize;
        };
        var _Sequelize = Sequelize;
        _Sequelize.cls = cls.createNamespace('sequelize-transaction');
        if (database_url) {
            this.sequelize = new _Sequelize(database_url, config_1.default);
        } else {
            this.sequelize = new _Sequelize(config_1.default.database, config_1.default.facebookId, config_1.default.password, config_1.default);
        }
        this.models = {
            User: user_1.default(this.sequelize),
            Post: post_1.default(this.sequelize),
            Iteration: iteration_1.default(this.sequelize)
        };
    }
    return Database;
}();
var database = new Database();
exports.models = database.getModels();
exports.sequelize = database.getSequelize();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Chalk = __webpack_require__(7);
var U = __webpack_require__(47);
var Hermes = function () {
    function Hermes(options) {
        var name = options.name,
            silent = options.silent;
        this.name = name;
        this.silent = silent || false;
    }
    Hermes.prototype.formatName = function () {
        if (this.name === 'server') {
            return Chalk.bgBlue.white(" " + this.name + " ");
        }
        if (this.name === 'frontend') {
            return Chalk.bgYellow.black(" " + this.name + " ");
        }
        throw Error("Name must be one of \"server\" or \"frontend\"");
    };
    Hermes.prototype.formatDate = function (date) {
        return Chalk.bgBlack(" " + U.formatDate(date) + " ");
    };
    Hermes.prototype.log = function (s, color) {
        if (color === void 0) {
            color = 'white';
        }
        var date = new Date();
        var log = "" + (this.name === 'server' ? this.formatDate(date) : '') + ("" + (this.name === 'server' ? this.formatName() : '')) + ("" + (this.name === 'server' ? ' ' : '')) + Chalk[color](s);
        if (!this.silent) {
            if (this.name === 'server') {
                console.log(log);
            } else {
                console.log('%c' + log, 'background:' + color); // Handle colors differently for frontend
            }
        }
        return {
            date: date,
            log: log,
            formattedDate: this.formatDate(date),
            name: this.name,
            silent: this.silent
        };
    };
    Hermes.prototype.debug = function (s) {
        return this.log("INFO: " + s, 'blue');
    };
    Hermes.prototype.info = function (s) {
        return this.log("INFO: " + s, 'white');
    };
    Hermes.prototype.warn = function (s) {
        return this.log("WARNING: " + s, 'yellow');
    };
    Hermes.prototype.error = function (s) {
        return this.log("ERROR: " + s, 'red');
    };
    Hermes.prototype.print = function (s) {
        return console.log(s);
    };
    return Hermes;
}();
exports.default = Hermes;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var R = __webpack_require__(0);
var G = __webpack_require__(4);
var _a = __webpack_require__(13),
    attributeFields = _a.attributeFields,
    resolver = _a.resolver;
var TEST_ENVS = __webpack_require__(2).TEST_ENVS;
var env = __webpack_require__(1).env;
var Iteration = __webpack_require__(14);
var db_1 = __webpack_require__(3);
exports.mockPosts = [{
    id: 1,
    userId: 1,
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363'
}, {
    id: 2,
    userId: 1,
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363'
}, {
    id: 3,
    userId: 2,
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363'
}];
var useMocks = R.contains(env, TEST_ENVS);
var userResolver = function (post) {
    if (useMocks) {
        return { id: post.userId };
    }
    return db_1.models.User.findOne({ where: { id: post.userId } });
};
var iterationsResolver = function (post) {
    if (useMocks) {
        return [{
            postId: post.id,
            title: 'x',
            body: 'y'
        }];
    }
    return db_1.models.Iteration.findAll({ where: { postId: post.id } });
};
exports.Type = new G.GraphQLObjectType({
    name: 'Post',
    description: 'A post',
    fields: function () {
        /**
         * User must be required in the callback to handle the circular dependency.
         * More: stackoverflow.com/questions/42531322/graphql-circular-dependency
         **/
        var User = __webpack_require__(15);
        return __assign({}, attributeFields(db_1.models.Post), { user: {
                type: User.Type,
                resolve: userResolver
            }, iterations: {
                type: new G.GraphQLList(Iteration.Type),
                resolve: iterationsResolver
            } });
    }
});
exports.Schema = {
    type: new G.GraphQLList(exports.Type),
    args: {
        id: { type: G.GraphQLID },
        facebookId: { type: G.GraphQLString }
    },
    resolve: R.contains(env, TEST_ENVS) ? function (_, _args) {
        return exports.mockPosts;
    } : resolver(db_1.models.Post)
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __webpack_require__(3);
var user_mock_1 = __webpack_require__(46);
var sequelizeFailure = function (reject) {
    return function (error) {
        reject(error.errors[0]); // Return only the descriptive .errors array
    };
};
var UserService = function (_super) {
    __extends(UserService, _super);
    function UserService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserService.prototype.findByFacebookId = function (facebookId) {
        return new Promise(function (resolve, reject) {
            return db_1.models.User.findOne({ where: { facebookId: facebookId } }).then(function (user) {
                return resolve(user);
            }).catch(sequelizeFailure(reject));
        });
    };
    UserService.prototype.find = function (id) {
        return new Promise(function (resolve, reject) {
            return db_1.models.User.findById(id).then(function (user) {
                return resolve(user);
            }).catch(sequelizeFailure(reject));
        });
    };
    UserService.prototype.signIn = function (facebookId) {
        return new Promise(function (resolve, reject) {
            return db_1.models.User.findOrCreate({ where: { facebookId: facebookId } }).then(function (_a) {
                var user = _a[0],
                    _isNew = _a[1];
                return resolve(user);
            }).catch(sequelizeFailure(reject));
        });
    };
    UserService.prototype.create = function (attributes) {
        return new Promise(function (resolve, reject) {
            return db_1.models.User.create(attributes).then(function (user) {
                return resolve(user);
            }).catch(sequelizeFailure(reject));
        });
    };
    UserService.prototype.all = function () {
        return new Promise(function (resolve, reject) {
            return db_1.models.User.findAll().then(function (users) {
                return resolve(users);
            }).catch(sequelizeFailure(reject));
        });
    };
    return UserService;
}(user_mock_1.MockUserService);
exports.UserService = UserService;
exports.userService = new UserService();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("graphql-sequelize");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var R = __webpack_require__(0);
var G = __webpack_require__(4);
var _a = __webpack_require__(13),
    attributeFields = _a.attributeFields,
    resolver = _a.resolver;
var TEST_ENVS = __webpack_require__(2).TEST_ENVS;
var env = __webpack_require__(1).env;
var db_1 = __webpack_require__(3);
exports.mockIterations = [{
    id: 1,
    postId: 1,
    title: 'First title',
    body: 'First body',
    createdAt: '2017-07-01 01:37:28.363'
}, {
    id: 2,
    postId: 1,
    title: 'Second title',
    body: 'Second body',
    createdAt: '2017-07-01 02:37:28.363'
}];
var useMocks = R.contains(env, TEST_ENVS);
var iterationResolver = useMocks ? function (_, _args) {
    return exports.mockIterations;
} : resolver(db_1.models.Iteration);
exports.Type = new G.GraphQLObjectType({
    name: 'Iteration',
    description: 'A iteration',
    fields: attributeFields(db_1.models.Iteration)
});
exports.Schema = {
    type: new G.GraphQLList(exports.Type),
    resolve: iterationResolver
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var R = __webpack_require__(0);
var G = __webpack_require__(4);
var _a = __webpack_require__(13),
    attributeFields = _a.attributeFields,
    resolver = _a.resolver;
var TEST_ENVS = __webpack_require__(2).TEST_ENVS;
var env = __webpack_require__(1).env;
var posts_1 = __webpack_require__(10);
var db_1 = __webpack_require__(3);
var Post = __webpack_require__(10);
exports.mockUsers = [{
    id: 1,
    facebookId: 'foo',
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363'
}, {
    id: 2,
    facebookId: 'baz',
    createdAt: '2017-07-01 01:37:28.363',
    updatedAt: '2017-07-01 01:37:28.363'
}];
var useMocks = R.contains(env, TEST_ENVS);
var postsResolver = function (user) {
    if (useMocks) {
        var belongsTo = function (_a) {
            var userId = _a.userId;
            return userId === user.id;
        };
        return R.filter(belongsTo, posts_1.mockPosts);
    }
    return db_1.models.Post.findAll({ where: { userId: user.id } });
};
var userResolver = useMocks ? function (_, _args) {
    return exports.mockUsers;
} : resolver(db_1.models.User);
exports.Type = new G.GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: __assign({}, attributeFields(db_1.models.User), { posts: {
            type: new G.GraphQLList(Post.Type),
            resolve: postsResolver
        } })
});
exports.Schema = {
    type: new G.GraphQLList(exports.Type),
    args: {
        id: { type: G.GraphQLID },
        facebookId: { type: G.GraphQLString }
    },
    resolve: userResolver
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonError = function (res) {
    return function (error) {
        res.status(500).json(error);
    };
};
exports.jsonSuccess = function (res) {
    return function (json) {
        res.status(200).json(json);
    };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var U = __webpack_require__(48);
exports.Enum = U.strEnum(['development', 'production']);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("awesome-typescript-loader");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Further details on Sentry setup for Express/Node:
 *   - docs.sentry.io/clients/node/integrations/express/
 *   - docs.sentry.io/clients/node/config/
 */


Object.defineProperty(exports, "__esModule", { value: true });
var Raven = __webpack_require__(69);
exports.monitorExceptions = function (config) {
    return function (app) {
        // Must configure Raven before doing anything else with it
        Raven.config(config.sentry_dsn, { environment: config.env }).install();
        // The request handler must be the first middleware on the app
        app.use(Raven.requestHandler());
        // The error handler must be before any other error middleware
        app.use(Raven.errorHandler());
    };
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var R = __webpack_require__(0);
var passport = __webpack_require__(5);
var authentication_1 = __webpack_require__(41);
var Facebook = __webpack_require__(35);
var Mock = __webpack_require__(36);
var TEST_ENVS = __webpack_require__(2).TEST_ENVS;
var env = __webpack_require__(1).env;
exports.setup = function (config) {
    return function (app) {
        authentication_1.setupStrategy(config);
        app.use(passport.initialize());
        app.use(passport.session());
        if (R.contains(env, TEST_ENVS)) {
            Mock.setup(app);
        } else {
            Facebook.setup(app);
        }
        app.get('/api/profile', isLoggedIn, function (req, res) {
            res.json(req.user);
        });
        app.get('/api/signout', isLoggedIn, function (req, res) {
            req.logout();
            res.redirect('/');
        });
    };
};
/**
 * Route middleware to make sure a user is logged in
 **/
var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(403).json({ message: 'Please sign in.' });
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = __webpack_require__(39);
var posts_1 = __webpack_require__(38);
var graphql_1 = __webpack_require__(37);
exports.default = function (app) {
    users_1.default(app);
    graphql_1.default(app);
    app.use('/api/posts', posts_1.default);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Chalk = __webpack_require__(7);
var hermes_1 = __webpack_require__(9);
var logger = new hermes_1.default({ name: 'server' });
exports.listen = function (app, _a) {
    var host = _a.host,
        port = _a.port;
    logger.print(Chalk.black.bgGreen("\n\n  Listening at http://" + host + ":" + port + "  \n"));
    app.listen(port);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.runHotMiddleware = function (app) {
    var webpack = __webpack_require__(19);
    var webpackConfig = __webpack_require__(49).default;
    var webpackCompiler = webpack(webpackConfig);
    app.use(__webpack_require__(72)(webpackCompiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true },
        noInfo: true,
        hot: true,
        inline: true,
        lazy: false,
        historyApiFallback: true,
        quiet: true
    }));
    app.use(__webpack_require__(73)(webpackCompiler));
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(12);
exports.serveFrontend = function (app) {
    var fs = __webpack_require__(62);
    var path = __webpack_require__(6);
    app.use('/', express.static(__dirname));
    app.get('*', function (_, res) {
        var file = path.join("dist", 'index.html'); // TODO: Replace with raw-loader require
        var html = fs.readFileSync(file).toString();
        res.status(200).send(html);
    });
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var session = __webpack_require__(61);
exports.setupSession = function (app) {
    /** More info: github.com/expressjs/session#options */
    var options = {
        secret: 'ssshhhhh',
        resave: false,
        saveUninitialized: true
    };
    app.use(session(options));
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = __webpack_require__(57);
var express = __webpack_require__(12);
exports.newApp = function (initalizers) {
    var app = express();
    app.use(bodyParser.json());
    initalizers.map(function (i) {
        return i(app);
    });
    return app;
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var config = __webpack_require__(56);
exports.default = config;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SequelizeStatic = __webpack_require__(8);
exports.default = function (sequelize) {
    var Schema = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: SequelizeStatic.INTEGER
        },
        createdAt: {
            allowNull: false,
            type: SequelizeStatic.DATE
        },
        postId: {
            type: SequelizeStatic.INTEGER,
            allowNull: false
        },
        title: {
            type: SequelizeStatic.STRING,
            allowNull: false,
            len: 1
        },
        body: {
            len: 1,
            allowNull: false,
            type: SequelizeStatic.TEXT
        }
    };
    var Iteration = sequelize.define('Iteration', Schema, {
        classMethods: {
            associate: function (models) {
                return Iteration.belongsTo(models.Post);
            }
        }
    });
    return Iteration;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SequelizeStatic = __webpack_require__(8);
exports.default = function (sequelize) {
    var Schema = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: SequelizeStatic.INTEGER
        },
        createdAt: {
            allowNull: false,
            type: SequelizeStatic.DATE
        },
        userId: {
            type: SequelizeStatic.INTEGER,
            allowNull: false
        }
    };
    var Post = sequelize.define('Post', Schema, {
        classMethods: {
            associate: function (models) {
                return Post.belongsTo(models.User);
            }
        }
    });
    return Post;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SequelizeStatic = __webpack_require__(8);
exports.default = function (sequelize) {
    var Schema = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: SequelizeStatic.INTEGER
        },
        facebookId: {
            allowNull: false,
            unique: true,
            type: SequelizeStatic.STRING
        },
        createdAt: {
            allowNull: false,
            type: SequelizeStatic.DATE
        }
    };
    return sequelize.define('User', Schema, {});
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var G = __webpack_require__(4);
exports.mockBooks = [{ id: '111', title: 'Moby Dick' }, { id: '222', title: 'Invisible Cities' }, { id: '333', title: '1984' }, { id: '444', title: 'A History of Future Cities' }];
var Type = new G.GraphQLObjectType({
    name: 'book',
    fields: {
        id: { type: G.GraphQLID },
        title: { type: G.GraphQLString }
    }
});
exports.Schema = {
    type: new G.GraphQLList(Type),
    args: {
        id: { type: G.GraphQLID }
    },
    resolve: function (_, _args) {
        return exports.mockBooks;
    }
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var G = __webpack_require__(4);
var Books = __webpack_require__(33);
var User = __webpack_require__(15);
var Post = __webpack_require__(10);
var Iteration = __webpack_require__(14);
var graphqlSchema = new G.GraphQLSchema({
    query: new G.GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            books: Books.Schema,
            users: User.Schema,
            posts: Post.Schema,
            iterations: Iteration.Schema
        }
    })
});
exports.default = graphqlSchema;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var passport = __webpack_require__(5);
exports.setup = function (app) {
    /**
     * Redirect the user to Facebook for authentication.  When complete,
     * Facebook will redirect the user back to the application at
     *     /auth/facebook/callback
     **/
    app.get('/auth/facebook', passport.authenticate('facebook'));
    /**
     * Facebook will redirect the user to this URL after approval. Finish
     * the authentication process by attempting to obtain an access token.
     * If access was granted, the user will be logged in. Otherwise,
     * authentication has failed.
     **/
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/signin',
        failureRedirect: '/auth/facebook/failure'
    }));
    app.get('/auth/facebook/failure', function (_, res) {
        return res.send(403).json({
            message: 'Sorry, but we were not able to connect your Facebook account.'
        });
    });
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var passport = __webpack_require__(5);
exports.setup = function (app) {
    app.get('/auth/facebook', passport.authenticate('test'), function (_, res) {
        res.redirect('/signin');
    });
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var graphqlHTTP = __webpack_require__(60);
var schema_1 = __webpack_require__(34);
exports.default = function (app) {
    app.use('/graphql', graphqlHTTP({ schema: schema_1.default, graphiql: true }));
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(12);
var requests_1 = __webpack_require__(16);
var user_1 = __webpack_require__(11);
var post_1 = __webpack_require__(45);
var router = express.Router();
router.get('/', function (_, res) {
    return __awaiter(_this, void 0, void 0, function () {
        var posts, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2,, 3]);
                    return [4 /*yield*/, post_1.postService.all()];
                case 1:
                    posts = _a.sent();
                    res.status(200).json(posts);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    requests_1.jsonError(res)(e_1);
                    return [3 /*break*/, 3];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
});
router.get('/users/:facebookId', function (req, res) {
    return __awaiter(_this, void 0, void 0, function () {
        var user, posts, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3,, 4]);
                    return [4 /*yield*/, user_1.userService.findByFacebookId(req.params.facebookId)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, post_1.postService.ownedBy(user)];
                case 2:
                    posts = _a.sent();
                    res.status(200).json(posts);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    requests_1.jsonError(res)(e_2);
                    return [3 /*break*/, 4];
                case 4:
                    return [2 /*return*/];
            }
        });
    });
});
router.post('/create', function (req, res) {
    return __awaiter(_this, void 0, void 0, function () {
        var user, post, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3,, 4]);
                    return [4 /*yield*/, user_1.userService.findByFacebookId(req.body.facebookId)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, post_1.postService.create(user, {
                        title: req.body.title,
                        body: req.body.body
                    })];
                case 2:
                    post = _a.sent();
                    res.status(200).json(post);
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    requests_1.jsonError(res)(e_3);
                    return [3 /*break*/, 4];
                case 4:
                    return [2 /*return*/];
            }
        });
    });
});
router.get('/:id', function (req, res) {
    return __awaiter(_this, void 0, void 0, function () {
        var iterations, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2,, 3]);
                    return [4 /*yield*/, post_1.postService.iterations(req.params.id)];
                case 1:
                    iterations = _a.sent();
                    res.status(200).json(iterations);
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    requests_1.jsonError(res)(e_4);
                    return [3 /*break*/, 3];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
});
router.post('/:id/iterate', function (req, res) {
    return __awaiter(_this, void 0, void 0, function () {
        var postId, iteration, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2,, 3]);
                    postId = Number(req.params.id);
                    return [4 /*yield*/, post_1.postService.iterate(postId, req.body)];
                case 1:
                    iteration = _a.sent();
                    res.status(200).json(iteration);
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _a.sent();
                    requests_1.jsonError(res)(e_5);
                    return [3 /*break*/, 3];
                case 3:
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = router;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var requests_1 = __webpack_require__(16);
var user_1 = __webpack_require__(11);
exports.default = function (app) {
    app.get('/api/users', function (_, res) {
        user_1.userService.all().then(function (users) {
            return res.status(200).json(users);
        }).catch(requests_1.jsonError(res));
    });
    app.get('/api/users/:id', function (req, res) {
        user_1.userService.find(Number(req.params.id)).then(function (user) {
            return res.status(200).json(user);
        }).catch(requests_1.jsonError(res));
    });
    // TODO: remove
    app.post('/api/users/create', function (req, res) {
        user_1.userService.create({ facebookId: req.query.facebookId }).then(function (user) {
            return res.status(200).json(user);
        }).catch(requests_1.jsonError(res));
    });
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var R = __webpack_require__(0);
var Chalk = __webpack_require__(7);
var hermes_1 = __webpack_require__(9);
var newApp_1 = __webpack_require__(27);
var http_1 = __webpack_require__(22);
var Passport = __webpack_require__(21);
var middleware_1 = __webpack_require__(24);
var listen_1 = __webpack_require__(23);
var exceptionMonitoring_1 = __webpack_require__(20);
var serveFrontend_1 = __webpack_require__(25);
var db_1 = __webpack_require__(3);
var session_1 = __webpack_require__(26);
var LOCAL_ENVS = __webpack_require__(2).LOCAL_ENVS;
var config = __webpack_require__(1);
var logger = new hermes_1.default({ name: 'server' });
var app = newApp_1.newApp([function (a) {
    return a.use(__webpack_require__(28)());
}, exceptionMonitoring_1.monitorExceptions(config), session_1.setupSession, http_1.default, Passport.setup(config)]);
if (R.contains(config.env, LOCAL_ENVS)) {
    logger.print(Chalk.bgBlue.black("\n\n  Running HMR...  \n"));
    middleware_1.runHotMiddleware(app);
}
serveFrontend_1.serveFrontend(app);
db_1.sequelize.sync().then(function () {
    return listen_1.listen(app, config);
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var R = __webpack_require__(0);
var passport = __webpack_require__(5);
var Facebook = __webpack_require__(65);
var user_1 = __webpack_require__(11);
var Mock = __webpack_require__(42);
var TEST_ENVS = __webpack_require__(2).TEST_ENVS;
var env = __webpack_require__(1).env;
var signInCallback = function (profile, done) {
    var facebookId = profile.id;
    user_1.userService.signIn(facebookId).then(function (_u) {
        return done(null, profile);
    }).catch(function (e) {
        return done(JSON.stringify(e));
    });
};
var setupFacebookStrategy = function (options) {
    var fbStrategy = new Facebook.Strategy(options, function (_t, _rt, profile, done) {
        signInCallback(profile, done);
    });
    passport.use(fbStrategy);
};
var setupMockStrategy = function (options) {
    var mockStrategy = new Mock.Strategy(options, signInCallback);
    passport.use(mockStrategy);
};
exports.setupStrategy = function (options) {
    var isTesting = R.contains(env, TEST_ENVS);
    if (isTesting) {
        setupMockStrategy(options);
    } else {
        setupFacebookStrategy(options);
    }
    /**
     * Determines which data of the user object should be stored in the session.
     * The result of the serializeUser method is attached to the session as
     * req.session.passport.user.
     **/
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    /**
     * The first argument of deserializeUser corresponds to the key of the user
     * object that was given to the done function. So your whole object is
     * retrieved with help of that key. That key here is the user id (key can
     * be any key of the user object i.e. name, email etc). In deserializeUser
     * that key is matched with the in memory array / database or any data resource.
     **/
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var util = __webpack_require__(70);
var passport = __webpack_require__(5);
var profile_mock_1 = __webpack_require__(43);
exports.Strategy = function Strategy(_options, verify) {
    this.name = 'test';
    this.verify = verify;
};
util.inherits(exports.Strategy, passport.Strategy);
exports.Strategy.prototype.authenticate = function (_) {
    var _this = this;
    this.verify(profile_mock_1.default, function (err, profile, info) {
        if (err) {
            return _this.error(err);
        }
        if (!profile) {
            return _this.fail(info);
        }
        _this.success(profile, info);
    });
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.id = 'xxxxxxxxxxxxxxxx';
exports.displayName = 'Mock User';
var profileMock = {
    id: exports.id,
    displayName: exports.displayName,
    provider: 'facebook',
    _raw: "{\"name\":\"" + exports.displayName + "\",\"id\":\"" + exports.id + "\"}",
    _json: { name: exports.displayName, id: exports.id }
};
exports.default = profileMock;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var MockPostService = function () {
    function MockPostService() {
        this.mockPost = {
            postId: 9,
            title: 'Foo Bar Baz'
        };
    }
    MockPostService.prototype.create = function (user, _iteration) {
        return new Promise(function (resolve, _) {
            var mock = { dataValues: { userId: user.get('id') } };
            resolve(mock);
        });
    };
    MockPostService.prototype.all = function () {
        return new Promise(function (resolve, _) {
            var baz = [{ dataValues: { userId: 1 } }, { dataValues: { userId: 2 } }, { dataValues: { userId: 2 } }];
            resolve(baz);
        });
    };
    MockPostService.prototype.ownedBy = function (user) {
        return new Promise(function (resolve, _) {
            var baz = [{ dataValues: { userId: user.get('id') } }, { dataValues: { userId: user.get('id') } }, { dataValues: { userId: user.get('id') } }];
            resolve(baz);
        });
    };
    MockPostService.prototype.iterations = function (postId) {
        return new Promise(function (resolve, reject) {
            if (postId % 2) {
                var mock = [{ dataValues: { postId: postId, title: 'Post 1, with no body' } }, {
                    dataValues: {
                        postId: postId,
                        title: 'Post 2, with body',
                        body: 'Body of post 2'
                    }
                }];
                resolve(mock);
            } else {
                reject({ message: "Cannot find post with id " + postId });
            }
        });
    };
    MockPostService.prototype.iterate = function (postId, data) {
        var _this = this;
        return new Promise(function (resolve, _) {
            return __awaiter(_this, void 0, void 0, function () {
                var mock;
                return __generator(this, function (_a) {
                    mock = { dataValues: __assign({}, this.mockPost, data, { postId: postId }) };
                    resolve(mock);
                    return [2 /*return*/];
                });
            });
        });
    };
    return MockPostService;
}();
exports.MockPostService = MockPostService;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var R = __webpack_require__(0);
var db_1 = __webpack_require__(3);
var post_mock_1 = __webpack_require__(44);
var hermes_1 = __webpack_require__(9);
var logger = new hermes_1.default({ name: 'server' });
var sequelizeFailure = function (reject) {
    return function (error) {
        logger.warn(error.toString()); // Log full error
        reject(error); // Return only the descriptive .errors array
        // reject(error.errors[0]) // Return only the descriptive .errors array
    };
};
var validateIteration = function (iteration, reject, cb) {
    if (R.isEmpty(iteration.title)) {
        return reject('Please provide a title.');
    }
    if (R.isEmpty(iteration.body)) {
        return reject('Please write something.');
    }
    cb();
};
var initPost = function (resolve, userId, iteration) {
    return function (t) {
        return __awaiter(_this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, db_1.models.Post.create({ userId: userId }, { transaction: t })];
                    case 1:
                        post = _a.sent();
                        return [4 /*yield*/, db_1.models.Iteration.create(__assign({}, iteration, { postId: post.get('id') }))];
                    case 2:
                        _a.sent();
                        resolve(post);
                        return [2 /*return*/];
                }
            });
        });
    };
};
var PostService = function (_super) {
    __extends(PostService, _super);
    function PostService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PostService.prototype.create = function (user, iteration) {
        return new Promise(function (resolve, reject) {
            if (!user || !user.get('id')) {
                return reject('Please provide a user.');
            }
            validateIteration(iteration, reject, function () {
                return db_1.sequelize.transaction(initPost(resolve, user.get('id'), iteration)).then(function (post) {
                    return resolve(post);
                }).catch(function (err) {
                    return reject(err);
                });
            });
        });
    };
    PostService.prototype.all = function () {
        return new Promise(function (resolve, reject) {
            return db_1.models.Post.findAll().then(function (posts) {
                return resolve(posts);
            }).catch(sequelizeFailure(reject));
        });
    };
    PostService.prototype.ownedBy = function (user) {
        return new Promise(function (resolve, reject) {
            return db_1.models.Post.findAll({ where: { userId: user.get('id') } }).then(function (posts) {
                return resolve(posts);
            }).catch(sequelizeFailure(reject));
        });
    };
    PostService.prototype.iterations = function (postId) {
        return new Promise(function (resolve, reject) {
            return db_1.models.Iteration.findAll({ where: { postId: postId } }).then(resolve).catch(reject);
        });
    };
    PostService.prototype.iterate = function (postId, data) {
        return new Promise(function (resolve, reject) {
            validateIteration(data, reject, function () {
                return db_1.models.Iteration.create(__assign({ postId: postId }, data)).then(resolve).catch(reject);
            });
        });
    };
    PostService.prototype.comments = function (iterationId) {
        return new Promise(function (resolve, _reject) {
            iterationId;
            resolve([]);
        });
    };
    return PostService;
}(post_mock_1.MockPostService);
exports.PostService = PostService;
exports.postService = new PostService();

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var MockUserService = function () {
    function MockUserService() {}
    MockUserService.prototype.findByFacebookId = function (facebookId) {
        return new Promise(function (resolve, reject) {
            if (!facebookId) {
                reject({ message: "Please provide a facebookId" });
            }
            if (facebookId == 'thisUsernameDoesntExist') {
                reject({ message: "User with facebookId \"" + facebookId + "\" does not exist" });
            }
            resolve({
                dataValues: { facebookId: facebookId, id: 123 },
                get: function (key) {
                    switch (key) {
                        case 'id':
                            return 123;
                        default:
                            throw Error("Value for key \"" + key + "\" is undefined on mock user");
                    }
                }
            });
        });
    };
    MockUserService.prototype.find = function (id) {
        return new Promise(function (resolve, reject) {
            if (isNaN(id)) {
                reject({ message: "User id must be an integer" });
            }
            if (id === 2) {
                reject({ message: "User with id \"" + 2 + "\" does not exist" });
            }
            resolve({
                dataValues: { facebookId: 'fake-fb-id', id: id },
                get: function (key) {
                    switch (key) {
                        case 'id':
                            return 123;
                        default:
                            throw Error("Value for key \"" + key + "\" is undefined on mock user");
                    }
                }
            });
        });
    };
    MockUserService.prototype.create = function (attributes) {
        return new Promise(function (resolve, reject) {
            if (attributes.facebookId == 'thisUsernameIsntAvailable') {
                reject({ message: "Sorry, \"" + attributes.facebookId + "\" is not available" });
            }
            resolve({ dataValues: attributes });
        });
    };
    MockUserService.prototype.all = function () {
        return new Promise(function (resolve, _) {
            resolve([{ facebookId: 'foobar' }]);
        });
    };
    return MockUserService;
}();
exports.MockUserService = MockUserService;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(64);
exports.formatDateStr = function (s) {
    var result = new Date(Date.parse(s)).toLocaleTimeString('en-UK', {
        hour12: false,
        day: '2-digit',
        month: 'numeric',
        year: 'numeric'
    });
    if (result === 'Invalid Date') {
        throw Error(result);
    }
    return result;
};
exports.formatDate = function (d) {
    return moment(d).format('DD-MM-YYYY HH:mm:ss');
};
exports.formatDateLong = function (d) {
    return moment(d).format('DD MMM YYYY, HH:mm');
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
// Adopted from:
//   https://basarat.gitbooks.io/typescript/docs/types/literal-types.html
function strEnum(o) {
    return o.reduce(function (res, key) {
        res[key] = key;
        return res;
    }, Object.create(null));
}
exports.strEnum = strEnum;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Env = __webpack_require__(17);
var _1 = __webpack_require__(50);
exports.default = _1.setup(Env.Enum.development);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var webpackMerge = __webpack_require__(74);
var path = __webpack_require__(6);
var Env = __webpack_require__(17);
exports.setup = function (env) {
    var isProd = String(env) === String(Env.Enum.production);
    var options = {
        rootDir: path.join(__dirname, '../..'),
        outputDir: isProd ? 'dist' : 'build',
        devtool: 'source-map',
        console: !isProd,
        isProd: isProd
    };
    var shared = [__webpack_require__(52), __webpack_require__(51), __webpack_require__(55)];
    var partials = isProd ? [__webpack_require__(54)].concat(shared) : [__webpack_require__(53)].concat(shared);
    return webpackMerge(partials.map(function (m) {
        return m.partial(options);
    }));
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(6);
var webpack = __webpack_require__(19);
var HtmlWebpackPlugin = __webpack_require__(63);
var entryFile = './src/frontend/main.tsx';
exports.partial = function (c) {
    return {
        entry: c.isProd ? entryFile : {
            app: ['webpack-hot-middleware/client?reload=true', entryFile]
        },
        output: {
            path: path.join(c.rootDir, c.outputDir),
            filename: 'frontend.js',
            publicPath: '/'
        },
        devtool: c.devtool,
        plugins: (c.isProd ? [] : [new webpack.HotModuleReplacementPlugin()]).concat([new HtmlWebpackPlugin({ template: './src/frontend/index.html' })])
    };
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var loaders = function (c) {
    var frontendDir = function (path) {
        if (path === void 0) {
            path = '';
        }
        return c.rootDir + "/src/frontend/" + path;
    };
    return [{
        loader: 'style-loader'
    }, {
        loader: 'css-loader',
        options: {
            importLoaders: 2,
            sourceMap: true,
            modules: true,
            localIdentName: '[local]___[hash:base64:5]'
        }
    }, {
        loader: 'postcss-loader',
        options: {
            plugins: function () {
                return [__webpack_require__(68)({ path: [frontendDir()] }), __webpack_require__(67)(), __webpack_require__(66)({ relative: frontendDir() })];
            }
        }
    }];
};
exports.partial = function (c) {
    return {
        module: {
            rules: [{
                include: c.rootDir,
                test: /\.css?$/,
                use: loaders(c),
                exclude: /node_modules/
            }]
        }
    };
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var CheckerPlugin = __webpack_require__(18).CheckerPlugin;
exports.partial = function () {
    return {
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: __webpack_require__(71)(['react-hot-loader', 'awesome-typescript-loader']),
                exclude: /node_modules/
            }]
        },
        plugins: [new CheckerPlugin()]
    };
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var CheckerPlugin = __webpack_require__(18).CheckerPlugin;
exports.partial = function () {
    return {
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            }]
        },
        plugins: [new CheckerPlugin()]
    };
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(6);
exports.partial = function (c) {
    return {
        resolve: {
            modules: ['node_modules', path.join(c.rootDir, 'src')],
            /**
             * Though the project's source is in Typescript, we must support Javascript
             * resolution as well, because some node_modules import JS files.
             */
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
            alias: {
                '~': path.resolve('./src')
            }
        }
    };
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * NOTE: The Sequelize CLI expects config to be either .json or .js. As
 * as result, this JS file has to exist in order to execute migrations.
 * The index.ts file in this same directory is identical to this, but
 * enforces the typed IDatabaseConfig interface.
 */

const appConfig = __webpack_require__(1)

module.exports = appConfig.db


/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("continuation-local-storage");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("html-webpack-plugin");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("postcss-assets");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("postcss-cssnext");

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("postcss-import");

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("raven");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("webpack-combine-loaders");

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("webpack-merge");

/***/ })
/******/ ]);
//# sourceMappingURL=backend.js.map