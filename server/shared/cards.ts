export type Card = {
  id: number;
  title: string;
  sentences: string[];
  image: string;
};

export const cards: Card[] = [
  {
    id: 1,
    title: "El Gallo",
    sentences: [
      "El que le cantó a San Pedro, y a tu vecina también.",
      "Si no canta al amanecer, es que la fiesta duró hasta tarde.",
      "El que no se levanta temprano, le amanece dormido en el sillón.",
    ],
    image: "/images/1.jpg",
  },
  {
    id: 2,
    title: "El Diablito",
    sentences: [
      "Pórtate mal cuatito, si no te pierdes la diversión.",
      "Con este diablito, hasta tu suegra baila.",
      "El que te tienta con un tequilita más.",
    ],
    image: "/images/2.jpg",
  },
  {
    id: 3,
    title: "La Dama",
    sentences: [
      "Puliendo el paso, y el marido en casa esperándola.",
      "La que no llega tarde, solo que no se sabe la hora.",
      "Con esta dama, hasta la cruda se olvida.",
    ],
    image: "/images/3.jpg",
  },
  {
    id: 4,
    title: "El Catrín",
    sentences: [
      "Vestido y alborotado... para la fiesta, ¡claro!",
      "El que siempre trae cartera, aunque sea prestada.",
      "Tan elegante, que te quita lo bailado.",
    ],
    image: "/images/4.jpg",
  },
  {
    id: 5,
    title: "El Paraguas",
    sentences: [
      "Para el sol y para el agua, y para esconder lo que llevas.",
      "El que te cubre... del sol de la vergüenza.",
      "Cuando llueve a cántaros, este te salva del oso.",
    ],
    image: "/images/5.jpg",
  },
  {
    id: 6,
    title: "La Sirena",
    sentences: [
      "Con los cantos de sirena, no te vayas a ahogar en tequila.",
      "La que te jala al fondo... del vaso.",
      "Sus cantos son tan fuertes, que hasta el borracho se endereza.",
    ],
    image: "/images/6.jpg",
  },
  {
    id: 7,
    title: "La Escalera",
    sentences: [
      "Sube, sube, escalera mía, que me espera la copa fría.",
      "La que te lleva al segundo piso... o al tercer trago.",
      "Cuando la fiesta está en la azotea, ¡a subir!",
    ],
    image: "/images/7.jpg",
  },
  {
    id: 8,
    title: "La Botella",
    sentences: [
      "La herramienta del borracho, y la del fiestero.",
      "Agarra la botella por el cuello, que mañana no te acuerdes.",
      "Con una en la mano, y otra en el corazón.",
    ],
    image: "/images/8.jpg",
  },
  {
    id: 9,
    title: "El Barril",
    sentences: [
      "Tanto va el cántaro al agua... hasta que te llenas como barril.",
      "El que siempre está lleno de sorpresas... y de chelas.",
      "Aquí se guarda el secreto de la felicidad... y la cruda.",
    ],
    image: "/images/9.jpg",
  },
  {
    id: 10,
    title: "El Árbol",
    sentences: [
      "El que a buen árbol se arrima, buena sombra le cobija... y buen trago también.",
      "De este árbol, caen las manzanas y los amigos caídos.",
      "Súbete al árbol si no quieres que te vean con ella.",
    ],
    image: "/images/10.jpg",
  },
  {
    id: 11,
    title: "El Melón",
    sentences: [
      "Melo das o me lo quitas... pero no me lo dejes a medias.",
      "La rebanada que te cura la cruda, o te la provoca.",
      "Tan dulce que te emborracha de sabor.",
    ],
    image: "/images/11.jpg",
  },
  {
    id: 12,
    title: "El Valiente",
    sentences: [
      "Por qué le temes, si no es para tanto... ¡un shot más!",
      "El que le entra a todo, menos a pagar la cuenta.",
      "El que se atreve a bailar con la más fea.",
    ],
    image: "/images/12.jpg",
  },
  {
    id: 13,
    title: "El Gorrito",
    sentences: [
      "El gorrito de San Juan, se lo pone y se lo quita... con cada tequilazo.",
      "El que se pone cuando la fiesta se pone buena.",
      "Cuando ya no sabes ni dónde lo dejaste.",
    ],
    image: "/images/13.jpg",
  },
  {
    id: 14,
    title: "La Muerte",
    sentences: [
      "La flaca, la calaca, la huesuda... y la que no falta en la fiesta.",
      "La que te invita a echarte el último, sin arrepentimiento.",
      "Cuando te agarra el cansancio, pero la fiesta no termina.",
    ],
    image: "/images/14.jpg",
  },
  {
    id: 15,
    title: "La Pera",
    sentences: [
      "La que espera, desespera... pero no por la pera.",
      "Cuando se cae del árbol, es porque ya está madura.",
      "No le des la pera, que se la come toda.",
    ],
    image: "/images/15.jpg",
  },
  {
    id: 16,
    title: "La Bandera",
    sentences: [
      "El jorobado de la bandera, y el que baila hasta el amanecer.",
      "Tres colores para la patria, y mil para la fiesta.",
      "Con esta bandera, no hay quien se siente.",
    ],
    image: "/images/16.jpg",
  },
  {
    id: 17,
    title: "El Bandolón",
    sentences: [
      "El que lleva el son... de la cumbia que no conoces.",
      "Con este son, hasta los muertos bailan.",
      "El que pone el ritmo para que todos se suelten.",
    ],
    image: "/images/17.jpg",
  },
  {
    id: 18,
    title: "El Violoncello",
    sentences: [
      "La tabla del violonchelo, y la que aguanta todos los tragos.",
      "Con este violín, te saco a bailar hasta el amanecer.",
      "Suena tan profundo, como tu cruda mañana.",
    ],
    image: "/images/18.jpg",
  },
  {
    id: 19,
    title: "La Garza",
    sentences: [
      "La que en el cielo se posa, y en tu vaso se vacía.",
      "Elegante y delgada, como tu figura antes de la botana.",
      "Cuando te sube el alcohol, sientes que vuelas como garza.",
    ],
    image: "/images/19.jpg",
  },
  {
    id: 20,
    title: "El Pájaro",
    sentences: [
      "El que vuela y no se posa... hasta que se le acaba la pila.",
      "Libre como el viento, hasta que te atrapa la resaca.",
      "Si vuela muy alto, es que ya se le subieron los grados.",
    ],
    image: "/images/20.jpg",
  },
  {
    id: 21,
    title: "La Mano",
    sentences: [
      "La que no trabaja, no come... ¡pero sí se toma!",
      "Cuando te estira la mano, es para pedirte otra cerveza.",
      "Con esta mano te marco, con la otra te sirvo.",
    ],
    image: "/images/21.jpg",
  },
  {
    id: 22,
    title: "La Bota",
    sentences: [
      "La del borracho, hasta el caño... y la que no te deja caminar derecho.",
      "Llénala de lo que quieras, pero que no falte nada.",
      "La que te aguanta hasta el final de la fiesta.",
    ],
    image: "/images/22.jpg",
  },
  {
    id: 23,
    title: "La Luna",
    sentences: [
      "La que alumbra de noche, y la que te ve llegar a casa.",
      "Con esta luna, hasta los sobrios se ponen románticos.",
      "Tan brillante que te ciega, como tu nivel de alcohol.",
    ],
    image: "/images/23.jpg",
  },
  {
    id: 24,
    title: "El Cotorro",
    sentences: [
      "El que habla y no dice nada... pero a estas alturas, nadie entiende.",
      "Con este cotorro, la plática no se acaba, aunque no haya sentido.",
      "Habla tanto, que hasta te da sed.",
    ],
    image: "/images/24.jpg",
  },
  {
    id: 25,
    title: "El Borracho",
    sentences: [
      "Ah, qué borracho tan necio, ya no sabe ni su precio... ¡pero sí el camino a la barra!",
      "El que le da al trago, hasta que le da el mareo.",
      "Con este, la fiesta no termina, solo se transforma.",
    ],
    image: "/images/25.jpg",
  },
  {
    id: 26,
    title: "El Negrito",
    sentences: [
      "El que corre y no se para... hasta que choca con la pared.",
      "Tan veloz, que te deja sin aliento en la pista de baile.",
      "Con este negrito, la fiesta no se detiene.",
    ],
    image: "/images/26.jpg",
  },
  {
    id: 27,
    title: "El Corazón",
    sentences: [
      "El que te da la vida, y el que te rompen en la peda.",
      "Con este, amas y odias a la vez, según el trago.",
      "El que late fuerte... por otra ronda.",
    ],
    image: "/images/27.jpg",
  },
  {
    id: 28,
    title: "La Sandia",
    sentences: [
      "La de las rebanadas grandes, para que alcance para todos... los borrachos.",
      "Dulce por fuera, pero por dentro... pura pepita.",
      "Tan fresca que te quita la sed... o te da más ganas de beber.",
    ],
    image: "/images/28.jpg",
  },
  {
    id: 29,
    title: "El Tambor",
    sentences: [
      "El que redobla y no se cansa... como tu estómago en la cruda.",
      "Con este ritmo, hasta el más tieso se mueve.",
      "Suena tan fuerte, que no te deja pensar en tus problemas.",
    ],
    image: "/images/29.jpg",
  },
  {
    id: 30,
    title: "El Camarón",
    sentences: [
      "El que se duerme se lo lleva la corriente... o lo dejan sin trago.",
      "Pequeñito pero picoso, como el shot de mezcal.",
      "Con este, la fiesta se mueve, y tú te mueves con ella.",
    ],
    image: "/images/30.jpg",
  },
  {
    id: 31,
    title: "Las Jaras",
    sentences: [
      "Las que se tiran y no se ven... como tus ganas de ir a casa.",
      "Apuntando al blanco, como tu amigo a la barra.",
      "Lánzalas con fuerza, y que la fiesta continúe.",
    ],
    image: "/images/31.jpg",
  },
  {
    id: 32,
    title: "El Músico",
    sentences: [
      "El que toca, toca y se la lleva... toda la atención.",
      "Con este, la fiesta no para, aunque ya duela la cabeza.",
      "Suena tan bien, que hasta te hace olvidar tu nombre.",
    ],
    image: "/images/32.jpg",
  },
  {
    id: 33,
    title: "La Araña",
    sentences: [
      "La tejedora, la que teje su tela... y sus excusas.",
      "Si te pica, es porque te pasaste de copas.",
      "La que se esconde, como tu vergüenza mañana.",
    ],
    image: "/images/33.jpg",
  },
  {
    id: 34,
    title: "El Soldado",
    sentences: [
      "El que marcha a la guerra... por otra cerveza.",
      "Firme y dispuesto, hasta el último trago.",
      "Con este, la batalla de la fiesta está ganada.",
    ],
    image: "/images/34.jpg",
  },
  {
    id: 35,
    title: "La Estrella",
    sentences: [
      "La que brilla en el cielo... y la que ves doble.",
      "Tan brillante que te ciega, como tu estado de ebriedad.",
      "Pide un deseo, a ver si te acuerdas mañana.",
    ],
    image: "/images/35.jpg",
  },
  {
    id: 36,
    title: "El Cazo",
    sentences: [
      "El que se calienta, se quema... y el que no se calienta, se lo pierden.",
      "Listo para la carnita asada... o para el recalentado.",
      "Tan grande que cabe todo, como tus ganas de seguir la fiesta.",
    ],
    image: "/images/36.jpg",
  },
  {
    id: 37,
    title: "El Mundo",
    sentences: [
      "El que da vueltas y vueltas... como tu cabeza.",
      "Con este, le das la vuelta a todo, menos al trago.",
      "El que te muestra el camino, aunque no sepas a dónde ir.",
    ],
    image: "/images/37.jpg",
  },
  {
    id: 38,
    title: "El Apache",
    sentences: [
      'El que da el grito... de "¡Loteria!" o "¡Salud!"',
      "Listo para la batalla... de baile y copas.",
      "Tan bravo, que hasta te asusta el tequilazo.",
    ],
    image: "/images/38.jpg",
  },
  {
    id: 39,
    title: "El Nopal",
    sentences: [
      "El que da nopales... y también espinas, ¡cuidado!",
      "Tan mexicano como el tequila, y tan verde como tus ganas de seguir.",
      "Picoso por fuera, pero sabroso por dentro.",
    ],
    image: "/images/39.jpg",
  },
  {
    id: 40,
    title: "El Alacrán",
    sentences: [
      "El que pica y no se ve... como la última copa.",
      "Cuidado con este, que te deja adolorido.",
      "Tan venenoso como el chisme en la fiesta.",
    ],
    image: "/images/40.jpg",
  },
  {
    id: 41,
    title: "La Rosa",
    sentences: [
      "La que se cultiva con amor, y se marchita con el alcohol.",
      "Tan bella como la última copa... hasta que te da la cruda.",
      "Con esta, el romance florece, o se desinfla.",
    ],
    image: "/images/41.jpg",
  },
  {
    id: 42,
    title: "La Calavera",
    sentences: [
      "La que se ríe de la vida, y de tus decisiones en la peda.",
      "La que te recuerda que la vida es corta... y la fiesta también.",
      "Baila con ella, que mañana es otro día.",
    ],
    image: "/images/42.jpg",
  },
  {
    id: 43,
    title: "La Campana",
    sentences: [
      "La que suena y te llama... a la siguiente ronda.",
      "Ding, dong, ¡se acabó la pena!",
      "Cuando suena la campana, la fiesta no para.",
    ],
    image: "/images/43.jpg",
  },
  {
    id: 44,
    title: "El Cantarito",
    sentences: [
      "El que se llena y se vacía... y se vuelve a llenar.",
      "Ideal para la bebida refrescante... o el ponche picoso.",
      "Tan seductor, que no puedes dejar de llenarlo.",
    ],
    image: "/images/44.jpg",
  },
  {
    id: 45,
    title: "El Venado",
    sentences: [
      "El que corre y no se cansa... de la fiesta.",
      "Veloz como el shot que te bajas en un segundo.",
      "Con este, no hay quien te alcance en la pista.",
    ],
    image: "/images/45.jpg",
  },
  {
    id: 46,
    title: "El Sol",
    sentences: [
      "El que alumbra y calienta... hasta que te deshidrata.",
      "Cuando se asoma, es señal de que la fiesta duró demasiado.",
      "Tan radiante como tus ganas de una michelada.",
    ],
    image: "/images/46.jpg",
  },
  {
    id: 47,
    title: "La Corona",
    sentences: [
      "La de los reyes... y la que se te cae al bailar.",
      "Si la traes puesta, es que eres el rey o la reina de la fiesta.",
      "Te hace sentir la realeza, hasta que te baja el efecto.",
    ],
    image: "/images/47.jpg",
  },
  {
    id: 48,
    title: "La Chalupa",
    sentences: [
      "La que rema y no se ahoga... como tú en la piscina de alcohol.",
      "Con esta chalupa, la fiesta flota sin problemas.",
      "Tan bonita que te enamora, y te lleva a la deriva.",
    ],
    image: "/images/48.jpg",
  },
  {
    id: 49,
    title: "El Pino",
    sentences: [
      "El que da buena madera... para prender la carne asada.",
      "Fuerte y erguido, como tu ánimo antes de las cinco rondas.",
      "Tan alto que no lo alcanzas, como tus expectativas a media noche.",
    ],
    image: "/images/49.jpg",
  },
  {
    id: 50,
    title: "El Pescado",
    sentences: [
      "El que nada y no se moja... como tú, que te escapas de todo.",
      "Cuidado con este, que se te escurre entre los dedos.",
      "Tan escurridizo como tu memoria al día siguiente.",
    ],
    image: "/images/50.jpg",
  },
  {
    id: 51,
    title: "La Palma",
    sentences: [
      "La que da coco... y también una buena sombra para dormir la cruda.",
      "Relajante como la vacación que nunca tomas.",
      "Baila al ritmo de la brisa, y del DJ.",
    ],
    image: "/images/51.jpg",
  },
  {
    id: 52,
    title: "La Maceta",
    sentences: [
      "La que te da flores... y la que usas de cenicero.",
      "Tan bonita que no la quieres regar, para que no se te arrugue.",
      "Llena de vida, como tu vaso antes de la fiesta.",
    ],
    image: "/images/52.jpg",
  },
  {
    id: 53,
    title: "El Arpa",
    sentences: [
      "La que suena y no se ve... como el dinero en tu bolsillo.",
      "Tan angelical, que te hace olvidar lo que dijiste anoche.",
      "Con este, la música te eleva, hasta que te cae la realidad.",
    ],
    image: "/images/53.jpg",
  },
  {
    id: 54,
    title: "La Rana",
    sentences: [
      "La que salta y no se para... ¡como tú en la pista de baile!",
      "Salta de alegría, que la noche apenas comienza.",
      "Tan ruidosa que no te deja escuchar lo que te dicen.",
    ],
    image: "/images/54.jpg",
  },
];
