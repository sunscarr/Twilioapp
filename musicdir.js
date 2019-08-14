const Sequelize = require("sequelize");
const sequelize = new Sequelize("Music", "postgres","Sanskar5",{
  host:"localhost",
  dialect:"postgres",
  define:{timestamps:false}
});


const Music= sequelize.define("music",{
  artist:{
    type:Sequelize.STRING,
    allowNull:true,
  },
  artist_link:{
    type:Sequelize.STRING,
    allowNull:true
  },
  genre:{
    type:Sequelize.STRING,
    allowNull:true
  },
  album:{
    type:Sequelize.STRING,
    allowNull:true,
    primaryKey:true
  },
  album_link:{
    type:Sequelize.STRING,
    allowNull:true
  },
  playlist:{
    type:Sequelize.STRING,
    allowNull:true
  },
  playlist_link:{
    type:Sequelize.STRING,
    allowNull:true
  },
  chart:{
    type:Sequelize.STRING,
    allowNull:true
  },
  chart_link:{
    type:Sequelize.STRING,
    allowNull:true
  },
},
{freezeTableName: true,}
);


Music.findAll().then(users => {
  for(i in users){
  console.log( (users[i].dataValues.artist));
}
});

module.exports = Music;

//Music.create({artist:"Ariana Grande", artist_link:"https://spoti.fi/2YLKKgG", genre:"pop", album:"Sweetener", album_link:"https://spoti.fi/2Yt4u9F", playlist:"This is Ariana Grande", playlist_link:"https://spoti.fi/2MKTTQa"})

/*
sequelize.query("SELECT * From music").then(([results, metadata]) => {
  for (i in results){
  console.log(results);
}});
*/
