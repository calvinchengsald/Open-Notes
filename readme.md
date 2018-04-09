
A clone of Wikipedia

[Heroku Link](https://open-notes.herokuapp.com/)


Requires a .env file to properly work

Example .env file <br>

  sendgrid="[sendgrid key]" <br>
  userCreateUrl="http://localhost:3000/user/create" <br>
  cookieSecret="[any string value you want]" <br>
  stripeSecret="[stripe secret api key]"

to generate a sendgrid key, please sign up for a [sendGrid account](https://sendgrid.com/) and then generate an API key [here](https://app.sendgrid.com/settings/api_keys)
<br>

to generate a strip key, please sign up for a [stripe account](https://stripe.com/) and view your secret key [here](https://dashboard.stripe.com/account/apikeys)



User Tiers:

Standard - Can only create and view public wikis. Editing is only to owner of the wiki
Premium - Can also create/view private wikis. Private Wikis can only be view/edited by the owner, any Admin level user, or any collaborators specified by the owner.
Admin - Can do whatever you want.


Change:

Added "are you sure you want to delete this wiki"
authentication with token at emailHelp
activated flag for each Account
