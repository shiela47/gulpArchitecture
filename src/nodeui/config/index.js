import _ from 'lodash';
import path from 'path';

let config = {
    "viewDir": path.join(__dirname,"../views"),
    "staticDir": path.join(__dirname,"../assets")
}

const init = () => {
    //  gulp里面的env拿不到node、webpack里的env，反之一样，每个env进程是独立
    if(process.env.NODE_ENV == "development"){
        const localConfig = {
            port:8081
        }
        config = _.extend(config,localConfig);
    }

    if(process.env.NODE_ENV == "production"){
        const proConfig = {
            port:80
        }
        config = _.extend(config,proConfig);
    }

    return config;
}

const result = init();
export  default  result;
