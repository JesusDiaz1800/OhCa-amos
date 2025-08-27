import { Question, Challenge } from './gameData'

// Preguntas de "¿Qué Prefieres?"
export const wouldYouRatherQuestions: Question[] = [
  { id: 1, text: "¿Preferirías vivir en la ciudad o en el campo?", tags: ['familiar'], difficulty: 'easy' },
  { id: 2, text: "¿Preferirías vivir en un mundo sin arte o sin ciencia?", tags: ['filosófico'], difficulty: 'medium' },
  { id: 3, text: "¿Preferirías poder volar o ser invisible?", tags: ['divertido'], difficulty: 'easy' },
  { id: 4, text: "¿Preferirías tener superfuerza o supervelocidad?", tags: ['divertido'], difficulty: 'easy' },
  { id: 5, text: "¿Preferirías tener el poder de deshacer cualquier error que cometas o la capacidad de no cometer nunca un error?", tags: ['filosófico'], difficulty: 'hard' },
  { id: 6, text: "¿Preferirías tener el control absoluto o la confianza absoluta?", tags: ['filosófico'], difficulty: 'hard' },
  { id: 7, text: "¿Preferirías estar siempre en lo cierto o estar siempre contento?", tags: ['filosófico'], difficulty: 'medium' },
  { id: 8, text: "¿Preferirías una vida sin estrés o sin aburrimiento?", tags: ['familiar'], difficulty: 'medium' },
  { id: 9, text: "¿Preferirías el humor negro o el bizarro?", tags: ['extremo'], difficulty: 'medium' },
  { id: 10, text: "¿Preferirías ser rico pero feo o pobre pero hermoso?", tags: ['familiar'], difficulty: 'easy' },
  { id: 11, text: "¿Preferirías viajar por el mundo o tener una familia?", tags: ['familiar'], difficulty: 'easy' },
  { id: 12, text: "¿Preferirías ser joven para siempre o ser sabio?", tags: ['filosófico'], difficulty: 'medium' },
  { id: 13, text: "¿Preferirías tener muchos amigos o tener un amor verdadero?", tags: ['familiar'], difficulty: 'medium' },
  { id: 14, text: "¿Preferirías ser famoso o ser feliz?", tags: ['familiar'], difficulty: 'easy' },
  { id: 15, text: "¿Preferirías tener mucho dinero o tener mucho amor?", tags: ['familiar'], difficulty: 'easy' },
  { id: 16, text: "¿Preferirías ser inteligente o ser atractivo?", tags: ['familiar'], difficulty: 'easy' },
  { id: 17, text: "¿Preferirías vivir en el pasado o vivir en el futuro?", tags: ['filosófico'], difficulty: 'medium' },
  { id: 18, text: "¿Preferirías tener el poder de leer mentes o el poder de cambiar el pasado?", tags: ['divertido'], difficulty: 'medium' },
  { id: 19, text: "¿Preferirías ser un héroe desconocido o un villano famoso?", tags: ['filosófico'], difficulty: 'hard' },
  { id: 20, text: "¿Preferirías vivir 100 años en el presente o 10 años en el futuro?", tags: ['filosófico'], difficulty: 'medium' }
]

// Preguntas de "¿Quién es más probable?"
export const mostLikelyQuestions: Question[] = [
  { id: 1, text: "¿Quién es más probable que se case con un famoso?", tags: ['familiar'], difficulty: 'easy' },
  { id: 2, text: "¿Quién es más probable que viaje solo por el mundo?", tags: ['familiar'], difficulty: 'easy' },
  { id: 3, text: "¿Quién es más probable que se olvide el cumpleaños de su pareja?", tags: ['familiar'], difficulty: 'easy' },
  { id: 4, text: "¿Quién es más probable que ofenda con trivialidades?", tags: ['familiar'], difficulty: 'easy' },
  { id: 5, text: "¿Quién es más probable que se convierta en millonario?", tags: ['familiar'], difficulty: 'easy' },
  { id: 6, text: "¿Quién es más probable que termine en la cárcel?", tags: ['extremo'], difficulty: 'medium' },
  { id: 7, text: "¿Quién es más probable que se convierta en presidente?", tags: ['familiar'], difficulty: 'easy' },
  { id: 8, text: "¿Quién es más probable que se case primero?", tags: ['familiar'], difficulty: 'easy' },
  { id: 9, text: "¿Quién es más probable que tenga más hijos?", tags: ['familiar'], difficulty: 'easy' },
  { id: 10, text: "¿Quién es más probable que se convierta en influencer?", tags: ['familiar'], difficulty: 'easy' },
  { id: 11, text: "¿Quién es más probable que se convierta en alcohólico?", tags: ['extremo'], difficulty: 'medium' },
  { id: 12, text: "¿Quién es más probable que se convierta en adicto a las redes sociales?", tags: ['familiar'], difficulty: 'easy' },
  { id: 13, text: "¿Quién es más probable que se convierta en vegano?", tags: ['familiar'], difficulty: 'easy' },
  { id: 14, text: "¿Quién es más probable que se convierta en hippie?", tags: ['familiar'], difficulty: 'easy' },
  { id: 15, text: "¿Quién es más probable que se convierta en hipster?", tags: ['familiar'], difficulty: 'easy' },
  { id: 16, text: "¿Quién es más probable que se convierta en gamer profesional?", tags: ['familiar'], difficulty: 'easy' },
  { id: 17, text: "¿Quién es más probable que se convierta en youtuber?", tags: ['familiar'], difficulty: 'easy' },
  { id: 18, text: "¿Quién es más probable que se convierta en tiktoker?", tags: ['familiar'], difficulty: 'easy' },
  { id: 19, text: "¿Quién es más probable que se convierta en streamer?", tags: ['familiar'], difficulty: 'easy' },
  { id: 20, text: "¿Quién es más probable que se convierta en blogger?", tags: ['familiar'], difficulty: 'easy' }
]

// Preguntas para Tomanji
export const tomanjiQuestions: Question[] = [
  { id: 1, text: "¿Cuál es tu sitio favorito para tener relaciones?", tags: ['hot', 'coqueto'], difficulty: 'medium' },
  { id: 2, text: "¿Tienes algún fetiche inconfesable?", tags: ['hot', 'extremo'], difficulty: 'hard' },
  { id: 3, text: "¿Has tenido conversaciones subidas de tono por chat o WhatsApp?", tags: ['coqueto', 'bar'], difficulty: 'medium' },
  { id: 4, text: "¿De las personas que estamos aquí, a quién tendrías más ganas de besar?", tags: ['coqueto', 'pre'], difficulty: 'medium' },
  { id: 5, text: "¿Cuál es tu juguete sexual favorito?", tags: ['hot', 'extremo'], difficulty: 'hard' },
  { id: 6, text: "¿Te has meado en la cama?", tags: ['after', 'locura'], difficulty: 'medium' },
  { id: 7, text: "¿Cuál es tu mayor fantasía sexual?", tags: ['hot', 'coqueto'], difficulty: 'medium' },
  { id: 8, text: "¿Cuál es tu mayor experiencia sexual?", tags: ['hot', 'coqueto'], difficulty: 'medium' },
  { id: 9, text: "¿Cuál es tu mayor experiencia con drogas?", tags: ['locura', 'after'], difficulty: 'medium' },
  { id: 10, text: "¿Cuál es tu mayor experiencia con alcohol?", tags: ['locura', 'bar'], difficulty: 'medium' }
]

// Retos para Tomanji
export const tomanjiChallenges: Challenge[] = [
  { id: 1, text: "Digas las razones por las que terminaron sus relaciones pasadas o tomen 5 tragos", tags: ['pre', 'coqueto'], difficulty: 'medium', type: 'group' },
  { id: 2, text: "Di un color, tu pareja se quitará una prenda de ese color", tags: ['hot', 'coqueto'], difficulty: 'medium', type: 'individual' },
  { id: 3, text: "Agarra la parte de mi cuerpo que más te gustó", tags: ['hot', 'coqueto'], difficulty: 'medium', type: 'individual' },
  { id: 4, text: "Del 1 al 10, cuánto me quieres, tómate ese número en shots", tags: ['after', 'locura'], difficulty: 'hard', type: 'individual' },
  { id: 5, text: "Repartir tragos", tags: ['bar', 'pre'], difficulty: 'easy', type: 'group' },
  { id: 6, text: "Terminar el vaso", tags: ['after', 'locura'], difficulty: 'medium', type: 'individual' },
  { id: 7, text: "Si llega un WhatsApp, todos deben tomar", tags: ['bar', 'pre'], difficulty: 'easy', type: 'group' },
  { id: 8, text: "Todos deben cantar una canción", tags: ['pre', 'locura'], difficulty: 'easy', type: 'group' },
  { id: 9, text: "Todos deben bailar", tags: ['pre', 'locura'], difficulty: 'easy', type: 'group' },
  { id: 10, text: "Todos deben hacer una mueca", tags: ['pre', 'locura'], difficulty: 'easy', type: 'group' }
]

// Preguntas para Preguntados
export const preguntadosQuestions: Question[] = [
  { id: 1, text: "¿Cuál es la capital de Bolivia?", tags: ['bolivia', 'geografía'], difficulty: 'easy' },
  { id: 2, text: "¿Cuál es el color de la bandera boliviana?", tags: ['bolivia', 'cultura'], difficulty: 'easy' },
  { id: 3, text: "¿Cuál es la bebida nacional de Bolivia?", tags: ['bolivia', 'cultura'], difficulty: 'easy' },
  { id: 4, text: "¿Cuál es el plato típico de Bolivia?", tags: ['bolivia', 'cultura'], difficulty: 'easy' },
  { id: 5, text: "¿Cuál es el baile tradicional de Bolivia?", tags: ['bolivia', 'cultura'], difficulty: 'easy' },
  { id: 6, text: "¿Cuál es la montaña más alta de Bolivia?", tags: ['bolivia', 'geografía'], difficulty: 'medium' },
  { id: 7, text: "¿Cuál es el lago más alto del mundo?", tags: ['bolivia', 'geografía'], difficulty: 'medium' },
  { id: 8, text: "¿Cuál es la ciudad más alta del mundo?", tags: ['bolivia', 'geografía'], difficulty: 'medium' },
  { id: 9, text: "¿Cuál es la capital de Francia?", tags: ['geografía', 'cultura'], difficulty: 'easy' },
  { id: 10, text: "¿Cuál es el río más largo del mundo?", tags: ['geografía'], difficulty: 'medium' }
]

// Cartas para Que Waso
export const queWasoBlackCards: string[] = [
  "_______ fue la razón por la que me terminaron la última vez",
  "_______ es lo que más me gusta hacer en mi tiempo libre",
  "_______ es mi mayor miedo",
  "_______ es lo que más me excita",
  "_______ es mi mayor secreto",
  "_______ es lo que más me avergüenza",
  "_______ es mi mayor fantasía",
  "_______ es lo que más me molesta",
  "_______ es mi mayor adicción",
  "_______ es lo que más me hace reír"
]

export const queWasoWhiteCards: string[] = [
  "Un payaso asesino",
  "Un unicornio borracho",
  "Un dinosaurio bailando",
  "Un alienígena cocinando",
  "Un robot enamorado",
  "Un fantasma cantando",
  "Un dragón llorando",
  "Un vampiro vegetariano",
  "Un lobo que viste de oveja",
  "Un gato que ladra",
  "Un perro que maúlla",
  "Un pollo que vuela",
  "Un pez que camina",
  "Un pájaro que nada",
  "Un elefante que vuela",
  "Una hormiga que levanta pesos",
  "Una araña que teje calcetines",
  "Una abeja que hace miel de chocolate",
  "Una mariposa que baila salsa",
  "Una mosca que toca el piano"
]

// Cartas para Peor es Nada
export const peorEsNadaWhiteCards: string[] = [
  "hace reguetón y es famoso",
  "te da el mejor sexo que has tenido en tu vida",
  "nunca tendrás que trabajar mientras estés con esa persona",
  "es millonario y te compra todo lo que quieras",
  "es el amor de tu vida y te hace feliz",
  "es perfecto/a en todos los sentidos",
  "te hace reír todos los días",
  "es el mejor cocinero/a del mundo",
  "es el mejor amante que puedes imaginar",
  "te hace sentir como la persona más especial del mundo"
]

export const peorEsNadaRedCards: string[] = [
  "por cada beso que le das, tu cuenta aumenta en 100 bolivianos mágicamente",
  "una bomba de tiempo atada al pecho",
  "quiere aprender a ser caníbal",
  "tiene una familia de mafiosos que te persigue",
  "es un alienígena que quiere llevarte a su planeta",
  "tiene una enfermedad contagiosa incurable",
  "es un robot que se apaga cada 5 minutos",
  "tiene una doble personalidad que es asesina",
  "es un fantasma que te chupa la energía vital",
  "tiene un pacto con el diablo que incluye tu alma"
]

// Preguntas para Psych!
export const psychQuestions: Question[] = [
  { id: 1, text: "¿Qué ha buscado recientemente en Google?", tags: ['la-verdad-sale'], difficulty: 'medium' },
  { id: 2, text: "¿Cuál es su talento secreto?", tags: ['la-verdad-sale'], difficulty: 'medium' },
  { id: 3, text: "¿Cuál es su mayor miedo?", tags: ['la-verdad-sale'], difficulty: 'medium' },
  { id: 4, text: "¿Cuál es su mayor fantasía?", tags: ['la-verdad-sale'], difficulty: 'medium' },
  { id: 5, text: "¿Cuál es su mayor secreto?", tags: ['la-verdad-sale'], difficulty: 'medium' },
  { id: 6, text: "¿Cuál es su mayor adicción?", tags: ['la-verdad-sale'], difficulty: 'medium' },
  { id: 7, text: "¿Cuál es su mayor obsesión?", tags: ['la-verdad-sale'], difficulty: 'medium' },
  { id: 8, text: "¿Cuál es su mayor pasión?", tags: ['la-verdad-sale'], difficulty: 'medium' },
  { id: 9, text: "¿Cuál es su mayor fortaleza?", tags: ['la-verdad-sale'], difficulty: 'medium' },
  { id: 10, text: "¿Cuál es su mayor debilidad?", tags: ['la-verdad-sale'], difficulty: 'medium' }
]

// Preguntas para TRIVIA 360
export const trivia360Questions: Question[] = [
  { id: 1, text: "¿Cuál es la capital de Japón?", tags: ['geografía'], difficulty: 'easy' },
  { id: 2, text: "¿En qué año comenzó la Segunda Guerra Mundial?", tags: ['historia'], difficulty: 'medium' },
  { id: 3, text: "¿Quién pintó la Mona Lisa?", tags: ['arte'], difficulty: 'easy' },
  { id: 4, text: "¿Cuál es el elemento químico más abundante en el universo?", tags: ['ciencia'], difficulty: 'medium' },
  { id: 5, text: "¿Cuál es el planeta más grande del sistema solar?", tags: ['ciencia'], difficulty: 'easy' },
  { id: 6, text: "¿Cuál es el río más largo de América del Sur?", tags: ['geografía'], difficulty: 'medium' },
  { id: 7, text: "¿En qué año se fundó la ciudad de La Paz?", tags: ['historia', 'bolivia'], difficulty: 'medium' },
  { id: 8, text: "¿Cuál es la montaña más alta de América?", tags: ['geografía'], difficulty: 'medium' },
  { id: 9, text: "¿Quién escribió 'Don Quijote'?", tags: ['literatura'], difficulty: 'easy' },
  { id: 10, text: "¿Cuál es la velocidad de la luz?", tags: ['ciencia'], difficulty: 'hard' }
]

// Preguntas para UNO
export const unoQuestions: Question[] = [
  { id: 1, text: "¿Cuál es tu color favorito?", tags: ['clásico'], difficulty: 'easy' },
  { id: 2, text: "¿Cuál es tu número de la suerte?", tags: ['clásico'], difficulty: 'easy' },
  { id: 3, text: "¿Cuál es tu animal favorito?", tags: ['clásico'], difficulty: 'easy' },
  { id: 4, text: "¿Cuál es tu comida favorita?", tags: ['clásico'], difficulty: 'easy' },
  { id: 5, text: "¿Cuál es tu película favorita?", tags: ['clásico'], difficulty: 'easy' },
  { id: 6, text: "¿Cuál es tu canción favorita?", tags: ['clásico'], difficulty: 'easy' },
  { id: 7, text: "¿Cuál es tu deporte favorito?", tags: ['clásico'], difficulty: 'easy' },
  { id: 8, text: "¿Cuál es tu lugar favorito?", tags: ['clásico'], difficulty: 'easy' },
  { id: 9, text: "¿Cuál es tu hobby favorito?", tags: ['clásico'], difficulty: 'easy' },
  { id: 10, text: "¿Cuál es tu bebida favorita?", tags: ['clásico'], difficulty: 'easy' }
]

// Palabras para Charades/Heads Up!
export const charadesWords: string[] = [
  "Fútbol", "Baile", "Comida", "Animal", "Película", "Música", "Deporte", "Profesión",
  "Cantar", "Bailar", "Cocinar", "Dormir", "Correr", "Saltar", "Nadar", "Volar",
  "Leer", "Escribir", "Dibujar", "Pintar", "Fotografiar", "Grabar", "Editar", "Publicar",
  "Comprar", "Vender", "Regalar", "Recibir", "Enviar", "Recibir", "Llamar", "Contestar",
  "Abrir", "Cerrar", "Subir", "Bajar", "Entrar", "Salir", "Llegar", "Irse",
  "Empezar", "Terminar", "Comenzar", "Acabar", "Iniciar", "Finalizar", "Crear", "Destruir"
]

// Preguntas para Papiro Pico
export const papiroPicoQuestions: Question[] = [
  { id: 1, text: "¿Cuál es tu mayor secreto sexual?", tags: ['extremo'], difficulty: 'hard' },
  { id: 2, text: "¿Cuál es tu mayor fantasía perversa?", tags: ['extremo'], difficulty: 'hard' },
  { id: 3, text: "¿Cuál es tu mayor experiencia tabú?", tags: ['extremo'], difficulty: 'hard' },
  { id: 4, text: "¿Cuál es tu mayor deseo inconfesable?", tags: ['extremo'], difficulty: 'hard' },
  { id: 5, text: "¿Cuál es tu mayor experiencia prohibida?", tags: ['extremo'], difficulty: 'hard' },
  { id: 6, text: "¿Cuál es tu mayor secreto familiar?", tags: ['extremo'], difficulty: 'hard' },
  { id: 7, text: "¿Cuál es tu mayor experiencia con alguien casado?", tags: ['extremo'], difficulty: 'hard' },
  { id: 8, text: "¿Cuál es tu mayor experiencia con alguien de tu familia?", tags: ['extremo'], difficulty: 'hard' },
  { id: 9, text: "¿Cuál es tu mayor experiencia con tu jefe?", tags: ['extremo'], difficulty: 'hard' },
  { id: 10, text: "¿Cuál es tu mayor experiencia con alguien por dinero?", tags: ['extremo'], difficulty: 'hard' }
]

// Preguntas para Chimboleo 3000
export const chimboleo3000Questions: Question[] = [
  { id: 1, text: "¿Cuál es tu mayor confesión tecnológica?", tags: ['futurista'], difficulty: 'medium' },
  { id: 2, text: "¿Cuál es tu mayor secreto digital?", tags: ['futurista'], difficulty: 'medium' },
  { id: 3, text: "¿Cuál es tu mayor experiencia virtual?", tags: ['futurista'], difficulty: 'medium' },
  { id: 4, text: "¿Cuál es tu mayor fantasía robótica?", tags: ['futurista'], difficulty: 'medium' },
  { id: 5, text: "¿Cuál es tu mayor experiencia con IA?", tags: ['futurista'], difficulty: 'medium' },
  { id: 6, text: "¿Cuál es tu mayor secreto cibernético?", tags: ['futurista'], difficulty: 'medium' },
  { id: 7, text: "¿Cuál es tu mayor experiencia holográfica?", tags: ['futurista'], difficulty: 'medium' },
  { id: 8, text: "¿Cuál es tu mayor fantasía espacial?", tags: ['futurista'], difficulty: 'medium' },
  { id: 9, text: "¿Cuál es tu mayor experiencia interdimensional?", tags: ['futurista'], difficulty: 'medium' },
  { id: 10, text: "¿Cuál es tu mayor secreto cuántico?", tags: ['futurista'], difficulty: 'medium' }
]
