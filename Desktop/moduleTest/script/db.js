/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function(window){
    var u = {};
    
    var db;
    var dbName = 'missfresh_demo';
    var dbPath = 'fs://missfresh_demo.db';
    var tableName = 'shoppingCart';

    // 引入db模块
    u.init = function(){
        if (db) {
            return;
        }
        db = api.require('db');
    };

    // 创建数据库及相关的数据表结构
    u.open = function() {
        u.init();
        var ret = db.openDatabaseSync({
            name: dbName,
            path: dbPath
        });
        if (ret.status) {
            db.executeSqlSync({
                name: dbName,
                sql: 'CREATE TABLE ' + tableName + '(wareId VARCHAR(32), wareCount INT)'   
            });
        }
    }

    // 查询操作，查询table中全部数据，或按商品ID查询
    u.select = function(wareId_) {
        u.init();
        var sql = 'SELECT * FROM ' + tableName;
        if (wareId_) {
            sql = 'SELECT * FROM ' + tableName + ' WHERE wareId=\"' + wareId_ + '\"';
        }
        return db.selectSqlSync({
            name: dbName,
            sql: sql
        });
    }

    // 更新操作，更新购物车中指定ID的商品数量
    u.update = function(wareId_, wareCount_) {
        u.init();
        return db.executeSqlSync({
            name: dbName,
            sql: 'UPDATE ' + tableName + ' SET wareCount=' + wareCount_ + ' WHERE wareId=\"' + wareId_ + '\"'
        });
    }

    // 插入操作，将商品ID和数量添加到购物车中
    u.insert = function(wareId_, wareCount_) {
        u.init();
        return db.executeSqlSync({
            name: dbName,
            sql: 'INSERT INTO ' + tableName + '(wareId,wareCount) VALUES(\"' + wareId_ + '\",' + wareCount_ + ')'    
        });
    }

/*end*/
    
    window.$db = u;

})(window);


