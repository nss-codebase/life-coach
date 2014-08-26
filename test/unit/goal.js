/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Goal      = require('../../app/models/goal'),
    dbConnect = require('../../app/lib/mongodb'),
    Mongo     = require('mongodb'),
    cp        = require('child_process'),
    db        = 'life-coach-test';

describe('Goal', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('.create', function(){
    it('should create a goal', function(done){
      var body = {name:'be a doctor', due:'2014-11-30', tags:'a,b,c,d'},
      userId = Mongo.ObjectID('000000000000000000000001');
      Goal.create(body, userId, function(err, goal){
        expect(goal).to.be.instanceof(Goal);
        expect(goal._id).to.be.instanceof(Mongo.ObjectID);
        expect(goal.userId).to.be.instanceof(Mongo.ObjectID);
        expect(goal.name).to.equal('be a doctor');
        expect(goal.due).to.be.instanceof(Date);
        expect(goal.tags).to.have.length(4);
        done();
      });
    });
  });

  describe('.findAllByUserId', function(){
    it('should find all goals by user id', function(done){
      var userId = Mongo.ObjectID('000000000000000000000001');
      Goal.findAllByUserId(userId, function(err, goals){
        expect(goals).to.have.length(2);
        done();
      });
    });
  });

  describe('.findAllByUserId', function(){
    it('should find a goals by user id and goal id', function(done){
      var userId = Mongo.ObjectID('000000000000000000000001'),
          goalId = 'a00000000000000000000001';
      Goal.findByGoalIdAndUserId(goalId, userId, function(err, goal){
        expect(goal).to.be.ok;
        done();
      });
    });
  });
});

