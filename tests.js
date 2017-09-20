// var request = require('supertest');
// var should = require('should');
// var testUtils = require("../../../test/testUtils");
// //request with url
// request = request(testUtils.url);

// //data will use in tests
// var APP_KEY = "";
// var API_KEY_ADMIN = "";
// var APP_ID = "";
// var DEVICE_ID = "1234567890";

// describe('Testing plugin', function(){
  
//   //Simple api test
//   describe('Empty plugin', function(){
//     it('should have no data', function(done){
      
//       //on first test we can retrieve settings
//       API_KEY_ADMIN = testUtils.get("API_KEY_ADMIN");
//       APP_ID = testUtils.get("APP_ID");
//       APP_KEY = testUtils.get("APP_KEY");
      
//       //and make a request
//       request
//       .get('/o?api_key='+API_KEY_ADMIN+'&app_id='+APP_ID+'&method=ourplugin')
//       .expect(200)
//       .end(function(err, res){
//         if (err) return done(err);
//         var ob = JSON.parse(res.text);
//         ob.should.be.empty;
//         done();
//       });
//     });
//   });
  
//   //Testing frontend
//   describe('Posting data to front end', function(){
//     //first we authenticate
//     before(function( done ){
//       testUtils.login( request );
//       testUtils.waitLogin( done );
//     });
//     it('should have no live data', function(done){
//       request
//       .post("/events/iap")
//       .send({
//         app_id:APP_ID, 
//         somedata:"data", 
//         //getting csrf
//         _csrf:testUtils.getCSRF()})
//       .expect(200)
//       .end(function(err, res){
//         if (err) return done(err);
//         done();
//       });
//     });
//   });
  
//   //Reset app data
//   describe('reset app', function(){
//     it('should reset data', function(done){
//       var params = {app_id:APP_ID};
//       request
//       .get('/i/apps/reset?api_key='+API_KEY_ADMIN+"&args="+JSON.stringify(params))
//       .expect(200)
//       .end(function(err, res){
//         if (err) return done(err);
//         var ob = JSON.parse(res.text);
//         ob.should.have.property('result', 'Success');
//         //lets wait some time for data to be cleared
//         setTimeout(done, 5000)
//       });
//     });
//   });
  
//   //after that we can also test to verify if data was cleared
//   describe('Verify empty plugin', function(){
//     it('should have no data', function(done){
//       request
//       .get('/o?api_key='+API_KEY_ADMIN+'&app_id='+APP_ID+'&method=ourplugin')
//       .expect(200)
//       .end(function(err, res){
//         if (err) return done(err);
//         var ob = JSON.parse(res.text);
//         ob.should.be.empty;
//         done();
//       });
//     });
//   });
// });