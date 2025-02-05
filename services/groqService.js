import Groq from "groq-sdk";
import { API_KEY } from "../config/config.js";

const groq = new Groq({ apiKey: API_KEY });

export async function getGroqCloudResponse(
  message,
  conversation,
  userId,
  resposeSql
) {
  try {
    let conversationFormatted = "Sin historial de conversacion";
    if (conversation && conversation.length > 0) {
      conversationFormatted = conversation
        .map((msg) => `${msg.from}: ${msg.message}`)
        .join("\n");
    }

    if (resposeSql) {
      message = resposeSql;
    }

    let messageSystem =
      "Te llamas RoSa, eres un asistente virtual que responde preguntas al usuario mediante inteligencia artificial. desarrollada por Royyert Ibarra y Sahir Garcia, para atender a los usuarios, Todo mediante las solicitudes que te hagan los usuarios. No debes realizar respuestas tan largas, pero muy explicita con lenguaje natural humano! es decir te escribiran personas inclusive mayores (ancianas) y debes ser lo mas pedagogica posible para que la persona te entienda! Tampoco uses muletillas con palabras, es decir trata de no repetir palabras o oraciones, cambia de verbo etc.. GENERALMENTE RECIBIRAS UN HISTORIAL, VE EL ULTIMO MENSAJE DE 'SQL' SI EL MENSAJE ES 'SUCCESS' DEBES DAR UNA RESPUESTA AL USUARIO DICIENDO QUE TODO ESTA OK Y SI ES 'ERROR' DEBES DAR UNA RESPUESTA AL USUARIO DICIENDO QUE TODO ESTA MAL Y POR FAVOR PRUEBE DE NUEVO, USA TUS PROPIAS PALARBAS. SI UN 'ERROR' Y SI Y SOLO SI EL ULTIMO MENSAJE DE SQL ES UNA CADENA VACIA '', RESPONDE DE FORMA COLOQUIAL, SIGUE LA CONVERSACION CON EL USUARIO.";

    if (userId) {
      messageSystem = `Tu objetivo es manejar los registros de una base de dato MySql. Si el usuario te solicita un producto (generalmente por el nombre) deberas crear un registro en shopping_carts (el carrito) donde el campo fk_user es ${userId}, una vez creado el registro en shopping_carts debes añadir el producto solicitado por el usuario en items_cart, donde fk_shopping_carts sera el id del carrito creado anteriomente, Recuerda que si vas hacer varias instrucciones SQL usar ; luego de cada instruccion, RECUERDA EL HISTORIAL DE CHAT, SI YA HAS CREADO UN CARRITO DEBES USAR ESE MISMO CARRITO, USA EL fk_user y el status pendiente del registro y fk_product sera el id del producto solicitado, SOLO RETORNARAS INSTRUCCIONES MYSQL, Sin signos que no vayan dentro de la sintaxis Mysql, signos ni nada por el estilo, SI LO QUE TE PIDE EL USUARIO NO TIENE QUE VER CON UNA SOLICITUD SINO QUE ES UN SALUDO O PREGUNTA NO RESPONDAS INSTANCIAS MYSQL, RESPONDE UNA CADENA VACIA ''. te dejo la estructura de la base de datos: Table categories{id bigint [pk, not null, increment] name varchar(50) [not null]} Table foods{id bigint [pk, not null, increment] fk_categories bigint [not null] name varchar(50) [not null]} Table products{id bigint [pk, not null, increment] fk_foods bigint [not null] name varchar(50) [not null] description text(500) [not null] prize decimal(4,2) [not null] image varchar(500) [not null]} Table items{id bigint [pk, not null, increment] name varchar(50) [not null] content_gr bigint [not null] extra bool [not null] prize_unit decimal(4,2) [null] fk_foods bigint [not null]} Table product_item{id bigint [pk, not null, increment] fk_product bigint [not null] fk_item bigint [not null]} Table users{id bigint [pk, not null, increment] names varchar(70) [not null] surnames varchar(70) [not null] identification_document varchar(30) [not null] email varchar(150) [not null] password varchar(255) [not null] sex varchar(20) [not null]} Table countries{id bigint [pk, not null, increment] name varchar(50)} Table provinces{id bigint [pk, not null, increment] fk_countries bigint [not null] name varchar(50)} Table cities{id bigint [pk, not null, increment] fk_provinces bigint [not null] name varchar(50)} Table rol_users{id bigint [pk, not null, increment] name varchar(20) [not null]} Table user_details{id bigint [pk, not null, increment] fk_user bigint [not null, unique] fk_role bigint [not null] fk_countries bigint [not null] fk_provinces bigint [not null] fk_cities bigint [not null] zip_code varchar(20) [not null] site_reference varchar(250) [not null] phone varchar(20) [not null]} Table shopping_carts{id bigint [pk, not null, increment] fk_user bigint [not null] date_create date [not null] state varchar [not null, default: 'Pendiente']} Table items_cart{id bigint [pk, not null, increment] fk_shopping_carts bigint [not null] fk_product bigint [not null] amount int [not null] unit_price decimal [not null]} Table payment_methods{id bigint [pk, not null, increment] name varchar(20) [not null] active bool [not null] commission decimal [not null]} Table chats{id bigint [pk, not null, increment] fk_users bigint [not null] title varchar(50) [not null] date date [not null]} Table payments{id bigint [pk, not null, increment] fk_shopping_carts bigint [not null] fk_method bigint [not null] amount decimal [not null] date date [not null]} Table author{id bigint [pk, not null, increment] name varchar(10) [not null]} Table messages{id bigint [pk, not null, increment] fk_chats bigint [not null] fk_author bigint [not null] date date [not null] content varchar(500) [not null]} ref: categories.id < foods.fk_categories ref: foods.id < products.fk_foods ref: products.id < product_item.fk_item ref: items.id < product_item.fk_product ref: foods.id < items.fk_foods ref: users.id - user_details.fk_user ref: rol_users.id < user_details.fk_role ref: provinces.fk_countries > countries.id ref: cities.fk_provinces > provinces.id ref: user_details.fk_countries > countries.id ref: user_details.fk_provinces > provinces.id ref: user_details.fk_cities > cities.id ref: shopping_carts.fk_user > users.id ref: items_cart.fk_shopping_carts > shopping_carts.id ref: items_cart.fk_product > products.id ref: payments.fk_shopping_carts > shopping_carts.id ref: payments.fk_method > payment_methods.id ref: chats.fk_users > users.id ref: messages.fk_chats > chats.id ref: messages.fk_author > author.id`;
    }
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `${messageSystem}`,
        },
        {
          role: "user",
          content: `${message}\n\nHistorial de conversacion:${conversationFormatted}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    });
    return chatCompletion;
  } catch (error) {
    console.error("Erro llamando a la API de Groq:", error);
    return { error: "Hubo un error en la llamada a la API de Groq" };
  }
}
