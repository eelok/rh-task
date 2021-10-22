npx sequelize-cli model:generate --name Manufacturer --attributes \
  name:string,location:string

npx sequelize-cli model:generate --name Phone --attributes \
  name:string,quantity:string,releaseDate:date

npx sequelize-cli model:generate --name User --attributes \
  email:string,name:string,password:char
