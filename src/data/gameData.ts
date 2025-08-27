export interface GameMode {
  id: string
  name: string
  description: string
  icon: string
  color: string
  intensity: 'low' | 'medium' | 'high'
  minPlayers: number
  maxPlayers: number
}

export interface Question {
  id: number
  text: string
  tags: string[]
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Challenge {
  id: number
  text: string
  tags: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  type: 'individual' | 'group' | 'target'
}

export interface GameType {
  id: string
  name: string
  description: string
  icon: string
  color: string
  rules: string[]
  variations: string[]
}

export interface BolivianSlang {
  word: string
  meaning: string
  example: string
}

export interface BolivianDrink {
  name: string
  description: string
  region: string
  alcohol: boolean
}

// Modos de juego actualizados
export const gameModes: GameMode[] = [
  {
    id: 'pre',
    name: 'Pre 🔥',
    description: 'Para calentar motores y romper el hielo',
    icon: '🍺',
    color: 'bg-gradient-to-r from-green-400 to-emerald-600',
    intensity: 'low',
    minPlayers: 2,
    maxPlayers: 12,
  },
  {
    id: 'locura',
    name: 'Locura 🎉',
    description: 'Para cuando la fiesta está en su punto máximo',
    icon: '🎉',
    color: 'bg-gradient-to-r from-pink-500 to-purple-600',
    intensity: 'high',
    minPlayers: 3,
    maxPlayers: 12,
  },
  {
    id: 'bar',
    name: 'Bar 🍻',
    description: 'Perfecto para bares y discotecas',
    icon: '🍻',
    color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    intensity: 'medium',
    minPlayers: 4,
    maxPlayers: 12,
  },
  {
    id: 'coqueto',
    name: 'Coqueto 💋',
    description: 'Para juegos más picantes y románticos',
    icon: '💋',
    color: 'bg-gradient-to-r from-red-500 to-pink-600',
    intensity: 'medium',
    minPlayers: 2,
    maxPlayers: 8,
  },
  {
    id: 'after',
    name: 'After 🌙',
    description: 'Para cuando la noche está avanzada',
    icon: '🌙',
    color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
    intensity: 'high',
    minPlayers: 3,
    maxPlayers: 12,
  },
  {
    id: 'bolivia',
    name: 'Bolivia 🇧🇴',
    description: 'Modo especial con jergas y bebidas bolivianas',
    icon: '🇧🇴',
    color: 'bg-gradient-to-r from-yellow-400 via-red-500 to-green-500',
    intensity: 'medium',
    minPlayers: 2,
    maxPlayers: 12,
  },
]

// Tipos de juegos actualizados
export const gameTypes: GameType[] = [
  {
    id: 'yo-nunca-he',
    name: 'Yo Nunca He 🤫',
    description: 'Confiesa secretos y descubre quién ha hecho qué',
    icon: '🤫',
    color: 'bg-gradient-to-r from-purple-500 to-pink-600',
    rules: [
      'Todos levantan 5 dedos',
      'Se lee una afirmación que empiece con "Yo nunca he..."',
      'Quienes SÍ lo han hecho, bajan un dedo y toman un trago',
      'Quien se quede sin dedos pierde'
    ],
    variations: ['Clásico', 'Picante', 'Extremo', 'Boliviano']
  },
  {
    id: 'verdad-o-reto',
    name: 'Verdad o Reto 🎯',
    description: 'Elige entre revelar la verdad o completar un desafío',
    icon: '🎯',
    color: 'bg-gradient-to-r from-orange-500 to-red-600',
    rules: [
      'El jugador elige entre Verdad o Reto',
      'Si elige Verdad, debe responder honestamente',
      'Si elige Reto, debe completar el desafío',
      'Si se niega, toma 3 tragos'
    ],
    variations: ['Suave', 'Picante', 'Extremo', 'Grupo']
  },
  {
    id: 'el-rey',
    name: 'El Rey 👑',
    description: 'Juego de cartas con reglas específicas para cada carta',
    icon: '👑',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    rules: [
      'Se reparten cartas a todos los jugadores',
      'Cada carta tiene una regla específica',
      'El Rey puede hacer lo que quiera',
      'Quien tenga el As al final pierde'
    ],
    variations: ['Clásico', 'Extremo', 'Boliviano', 'Grupo']
  },
  {
    id: 'paco',
    name: 'Paco 👮',
    description: 'Juego boliviano de adivinanzas y castigos',
    icon: '👮',
    color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    rules: [
      'Un jugador piensa en algo',
      'Los demás hacen preguntas de sí/no',
      'Quien adivine se convierte en el Paco',
      'Quien no adivine toma un trago'
    ],
    variations: ['Clásico', 'Extremo', 'Grupo', 'Categorías']
  },
  {
    id: 'picolo',
    name: 'Picolo ⚡',
    description: 'Juego de velocidad y reflejos',
    icon: '⚡',
    color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    rules: [
      'Se dice "Picolo" y se señala a alguien',
      'Esa persona debe decir "Picolo" y señalar a otro',
      'Quien se equivoque toma un trago',
      'Se puede cambiar la palabra'
    ],
    variations: ['Clásico', 'Rápido', 'Extremo', 'Categorías']
  },
  {
    id: 'heads-up',
    name: 'Heads Up! 🎭',
    description: 'Juego de mímica y adivinanzas',
    icon: '🎭',
    color: 'bg-gradient-to-r from-green-500 to-teal-600',
    rules: [
      'Un jugador actúa sin hablar',
      'Los demás adivinan qué está actuando',
      'Quien adivine actúa a continuación',
      'Quien no adivine toma un trago'
    ],
    variations: ['Películas', 'Personajes', 'Acciones', 'Boliviano']
  },
  {
    id: 'bomba-drink',
    name: 'Bomba Drink 💣',
    description: 'Juego de tiempo con bomba virtual',
    icon: '💣',
    color: 'bg-gradient-to-r from-red-600 to-pink-700',
    rules: [
      'Se activa una bomba virtual',
      'Los jugadores deben completar un desafío',
      'Quien tenga la bomba cuando explote pierde',
      'El perdedor toma 5 tragos'
    ],
    variations: ['Clásico', 'Extremo', 'Grupo', 'Categorías']
  },
  {
    id: 'que-prefieres',
    name: '¿Qué Prefieres? 🤔',
    description: 'Elige entre dos opciones difíciles',
    icon: '🤔',
    color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
    rules: [
      'Se presentan dos opciones',
      'Cada jugador elige una opción',
      'La minoría toma un trago',
      'Si hay empate, todos toman'
    ],
    variations: ['Clásico', 'Picante', 'Extremo', 'Boliviano']
  },
  {
    id: 'dados',
    name: 'Dados 🎲',
    description: 'Juegos tradicionales con dados',
    icon: '🎲',
    color: 'bg-gradient-to-r from-green-500 to-blue-600',
    rules: [
      'Se tiran 2 dados',
      'Cada número tiene una regla específica',
      'Quien saque dobles toma doble',
      'Quien saque 7 toma 7 tragos'
    ],
    variations: ['Clásico', 'Extremo', 'Boliviano', 'Grupo']
  },
  {
    id: 'preguntados',
    name: 'Preguntados 🧠',
    description: 'Juego de preguntas y respuestas',
    icon: '🧠',
    color: 'bg-gradient-to-r from-blue-500 to-purple-600',
    rules: [
      'Se hace una pregunta',
      'Quien responda mal toma un trago',
      'Quien responda bien puede hacer una pregunta',
      'Se puede pasar la pregunta'
    ],
    variations: ['General', 'Bolivia', 'Música', 'Deportes']
  },
  {
    id: 'shot-roulette',
    name: 'Shot Roulette 🍸',
    description: 'Ruleta rusa con shots',
    icon: '🍸',
    color: 'bg-gradient-to-r from-red-600 to-pink-700',
    rules: [
      'Se preparan 6 shots',
      'Uno tiene algo especial',
      'Los jugadores eligen un shot',
      'Quien tome el especial pierde'
    ],
    variations: ['Clásico', 'Extremo', 'Grupo', 'Categorías']
  },
  {
    id: 'beer-pong',
    name: 'Beer Pong 🏓',
    description: 'Juego clásico de precisión',
    icon: '🏓',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    rules: [
      'Se lanza una pelota a vasos',
      'Quien acierte el otro toma',
      'Quien falle toma él mismo',
      'Quien vacíe todos los vasos gana'
    ],
    variations: ['Clásico', 'Extremo', 'Grupo', 'Categorías']
  },
  {
    id: 'tomanji',
    name: 'Tomanji 🎮',
    description: 'Juego de fiesta completo con 20 modos diferentes',
    icon: '🎮',
    color: 'bg-gradient-to-r from-indigo-500 to-purple-600',
    rules: [
      'Elige entre 20 modos de juego',
      'Sigue las instrucciones en pantalla',
      'Si un reto incomoda, puedes saltarlo',
      'Incluye Oráculo IA y Detector de Mentiras'
    ],
    variations: ['Previa', 'Locura', 'Bar', 'Coqueto', 'Versus', 'Hot']
  },
  {
    id: 'spin-bottle',
    name: 'Juego de la Botella 🍾',
    description: 'Gira la botella y descubre quién juega',
    icon: '🍾',
    color: 'bg-gradient-to-r from-green-500 to-emerald-600',
    rules: [
      'Los jugadores se sientan en círculo',
      'Gira la botella virtual',
      'Quien apunte la botella juega',
      'Combina con Verdad o Reto'
    ],
    variations: ['Clásico', 'Extremo', 'Verdad o Reto']
  },
  {
    id: 'most-likely',
    name: '¿Quién es más probable? 🤷‍♂️',
    description: 'Vota quién es más propenso a hacer algo',
    icon: '🤷‍♂️',
    color: 'bg-gradient-to-r from-pink-500 to-rose-600',
    rules: [
      'Se plantea una pregunta',
      'Todos votan simultáneamente',
      'Quien reciba más votos toma',
      'Puede generar discusiones divertidas'
    ],
    variations: ['Familiar', 'Extremo', 'Personalizado']
  },
  {
    id: 'tequila-game',
    name: 'Tequila: Juego para tomar 🥃',
    description: '6 modos para animar cualquier fiesta',
    icon: '🥃',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    rules: [
      'Elige entre 6 modos principales',
      'Sigue las instrucciones en pantalla',
      'Algunos modos son de pago',
      'Perfecto para previas y fiestas'
    ],
    variations: ['Pre', 'Peda', 'After', 'Hot', 'Bar', 'Pareja']
  },
  {
    id: 'seco-mojado',
    name: 'El Seco Mojado 💧',
    description: 'Juego cañero de la cultura chupística boliviana',
    icon: '💧',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-600',
    rules: [
      'Juego de ritmo rápido',
      'Implica consumo de alcohol',
      'Ambiente de cultura chupística',
      'Diseño Funky Lo-fi'
    ],
    variations: ['Clásico', 'Extremo', 'Boliviano']
  },
  {
    id: 'peor-es-nada',
    name: 'Peor es Nada 😅',
    description: 'Crea la peor cita para un soltero',
    icon: '😅',
    color: 'bg-gradient-to-r from-red-500 to-pink-600',
    rules: [
      'Mínimo 3 jugadores',
      'Un jugador es el soltero',
      'Crea citas con cartas blancas y rojas',
      'El soltero elige la "peor" opción'
    ],
    variations: ['Familiar', 'Extremo', 'Personalizado']
  },
  {
    id: 'que-waso',
    name: 'Que Waso 😂',
    description: 'Juego de cartas boliviano para crear frases graciosas',
    icon: '😂',
    color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
    rules: [
      'Cada jugador recibe 10 cartas blancas',
      'Se saca una carta negra con espacio en blanco',
      'Los jugadores completan la frase',
      'Se elige la más "wasa" (graciosa)'
    ],
    variations: ['Clásico', 'Extremo', 'Boliviano']
  },
  {
    id: 'papiro-pico',
    name: 'Papiro Pico 📜',
    description: 'Juego nunca antes visto para destapar secretos íntimos',
    icon: '📜',
    color: 'bg-gradient-to-r from-amber-500 to-orange-600',
    rules: [
      'Juego con preguntas picantes',
      'Involucra confesión de secretos',
      'Diseño de pergamino antiguo',
      'Revelación de secretos ancestrales'
    ],
    variations: ['Clásico', 'Extremo', 'Personalizado']
  },
  {
    id: 'chimboleo-3000',
    name: 'Chimboleo 3000 🤖',
    description: 'Juego futurista para confesiones extremas',
    icon: '🤖',
    color: 'bg-gradient-to-r from-cyan-500 to-blue-600',
    rules: [
      'Juego con diseño futurista',
      'Efectos visuales de escaneo',
      'Confesiones extremas',
      'Diseño neumórfico y tecnológico'
    ],
    variations: ['Clásico', 'Extremo', 'Futurista']
  },
  {
    id: 'uno-game',
    name: 'UNO!™ 🃏',
    description: 'El clásico juego de cartas con nuevas reglas',
    icon: '🃏',
    color: 'bg-gradient-to-r from-red-500 to-yellow-500',
    rules: [
      'Sé el primero en quedarte sin cartas',
      'Combina colores o números',
      'Usa cartas especiales',
      'Incluye torneos mundiales'
    ],
    variations: ['Clásico', 'Personalizado', '2v2', 'Torneos']
  },
  {
    id: 'charades',
    name: 'Charades / Heads Up! 🎭',
    description: 'Juego de adivinanzas y mímicas',
    icon: '🎭',
    color: 'bg-gradient-to-r from-green-500 to-teal-600',
    rules: [
      'Un jugador actúa sin hablar',
      'Los demás adivinan',
      'Inclina el teléfono para pasar',
      'Funciona sin internet'
    ],
    variations: ['Películas', 'Series', 'Personajes', 'Música']
  },
  {
    id: 'psych',
    name: 'Psych! 🧠',
    description: 'Juego de adivinanzas absurdas sobre amigos',
    icon: '🧠',
    color: 'bg-gradient-to-r from-purple-500 to-pink-600',
    rules: [
      'Responde preguntas absurdas',
      'Sobre tus amigos',
      'Categorías variadas',
      'Diseño juguetón y dinámico'
    ],
    variations: ['La Verdad Sale', 'Word Up', 'Movie Bluff']
  },
  {
    id: 'trivia-360',
    name: 'TRIVIA 360 🎯',
    description: 'Juego de preguntas para estimular el cerebro',
    icon: '🎯',
    color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    rules: [
      'Diferentes rompecabezas de trivia',
      'Preguntas con 4 respuestas',
      'Verdadero o falso',
      'Tabla de posiciones online'
    ],
    variations: ['Clásico', 'Banderas', 'Puntos de Referencia']
  },
  {
    id: 'preguntados',
    name: 'Preguntados 🧠',
    description: 'Juego de trivia educativo y divertido',
    icon: '🧠',
    color: 'bg-gradient-to-r from-green-500 to-blue-600',
    rules: [
      'Consigue 6 personajes de categorías',
      'Gira la ruleta para elegir categoría',
      'Responde correctamente para ganar',
      'Incluye modo AR y Challengers'
    ],
    variations: ['Geografía', 'Historia', 'Arte', 'Ciencia']
  }
]

// Preguntas mejoradas de "Yo Nunca He" con referencias a nombres
export const neverHaveIEverQuestions: Question[] = [
  // Fáciles
  { id: 1, text: "Yo nunca he besado a alguien del mismo sexo", tags: ['pre', 'locura'], difficulty: 'easy' },
  { id: 2, text: "Yo nunca he mentido sobre mi edad", tags: ['pre', 'bar'], difficulty: 'easy' },
  { id: 3, text: "Yo nunca he robado algo de una tienda", tags: ['pre', 'locura'], difficulty: 'easy' },
  { id: 4, text: "Yo nunca he enviado un mensaje a la persona equivocada", tags: ['pre', 'coqueto'], difficulty: 'easy' },
  { id: 5, text: "Yo nunca he llorado en público", tags: ['pre', 'after'], difficulty: 'easy' },
  { id: 6, text: "Yo nunca he fingido estar enfermo para no ir al trabajo", tags: ['pre', 'bar'], difficulty: 'easy' },
  { id: 7, text: "Yo nunca he tenido una pelea física", tags: ['pre', 'locura'], difficulty: 'easy' },
  { id: 8, text: "Yo nunca he sido despedido de un trabajo", tags: ['pre', 'after'], difficulty: 'easy' },
  { id: 9, text: "Yo nunca he tenido una aventura con alguien comprometido", tags: ['coqueto', 'locura'], difficulty: 'easy' },
  { id: 10, text: "Yo nunca he usado ropa interior de otra persona", tags: ['coqueto', 'after'], difficulty: 'easy' },
  { id: 11, text: "Yo nunca he tenido miedo de los payasos", tags: ['pre', 'locura'], difficulty: 'easy' },
  { id: 12, text: "Yo nunca me han dicho que tengo mal aliento", tags: ['pre', 'bar'], difficulty: 'easy' },
  { id: 13, text: "Yo nunca he llorado durante una película de Pixar", tags: ['pre', 'after'], difficulty: 'easy' },
  { id: 14, text: "Yo nunca he tenido diarrea en la casa de un amigo", tags: ['pre', 'locura'], difficulty: 'easy' },
  { id: 15, text: "Yo nunca me he liado con alguien en los baños de la uni/oficina", tags: ['coqueto', 'locura'], difficulty: 'easy' },
  { id: 16, text: "Yo nunca he creado una cuenta falsa en las redes sociales para cotillear", tags: ['pre', 'bar'], difficulty: 'easy' },
  { id: 17, text: "Yo nunca he tenido un trío", tags: ['coqueto', 'locura'], difficulty: 'easy' },
  { id: 18, text: "Yo nunca he pasado más de cinco días sin ducharme", tags: ['pre', 'after'], difficulty: 'easy' },
  { id: 19, text: "Yo nunca he grabado con el móvil una relación íntima", tags: ['coqueto', 'locura'], difficulty: 'easy' },
  { id: 20, text: "Yo nunca he enviado un mensaje a alguien por accidente mientras hablaba mal de esa persona", tags: ['pre', 'bar'], difficulty: 'easy' },
  
  // Medianas
  { id: 11, text: "Yo nunca he tenido sexo en un lugar público", tags: ['coqueto', 'locura'], difficulty: 'medium' },
  { id: 12, text: "Yo nunca he consumido drogas ilegales", tags: ['locura', 'after'], difficulty: 'medium' },
  { id: 13, text: "Yo nunca he tenido una relación con alguien de mi mismo sexo", tags: ['coqueto', 'locura'], difficulty: 'medium' },
  { id: 14, text: "Yo nunca he tenido una pelea con un policía", tags: ['locura', 'after'], difficulty: 'medium' },
  { id: 15, text: "Yo nunca he tenido sexo con alguien de mi familia", tags: ['coqueto', 'extremo'], difficulty: 'medium' },
  { id: 16, text: "Yo nunca he tenido una relación con mi jefe", tags: ['coqueto', 'bar'], difficulty: 'medium' },
  { id: 17, text: "Yo nunca he tenido sexo con alguien por dinero", tags: ['coqueto', 'extremo'], difficulty: 'medium' },
  { id: 18, text: "Yo nunca he tenido una relación con alguien casado", tags: ['coqueto', 'locura'], difficulty: 'medium' },
  { id: 19, text: "Yo nunca he tenido sexo con alguien de mi mismo sexo", tags: ['coqueto', 'locura'], difficulty: 'medium' },
  { id: 20, text: "Yo nunca he tenido una relación con alguien de mi mismo sexo", tags: ['coqueto', 'locura'], difficulty: 'medium' },
  
  // Difíciles
  { id: 21, text: "Yo nunca he tenido sexo con alguien de mi familia", tags: ['extremo', 'after'], difficulty: 'hard' },
  { id: 22, text: "Yo nunca he tenido una relación con mi jefe", tags: ['extremo', 'bar'], difficulty: 'hard' },
  { id: 23, text: "Yo nunca he tenido sexo con alguien por dinero", tags: ['extremo', 'after'], difficulty: 'hard' },
  { id: 24, text: "Yo nunca he tenido una relación con alguien casado", tags: ['extremo', 'locura'], difficulty: 'hard' },
  { id: 25, text: "Yo nunca he tenido sexo con alguien de mi mismo sexo", tags: ['extremo', 'coqueto'], difficulty: 'hard' },
  { id: 26, text: "Yo nunca he tenido una relación con alguien de mi mismo sexo", tags: ['extremo', 'coqueto'], difficulty: 'hard' },
  { id: 27, text: "Yo nunca he tenido sexo con alguien de mi familia", tags: ['extremo', 'after'], difficulty: 'hard' },
  { id: 28, text: "Yo nunca he tenido una relación con mi jefe", tags: ['extremo', 'bar'], difficulty: 'hard' },
  { id: 29, text: "Yo nunca he tenido sexo con alguien por dinero", tags: ['extremo', 'after'], difficulty: 'hard' },
  { id: 30, text: "Yo nunca he tenido una relación con alguien casado", tags: ['extremo', 'locura'], difficulty: 'hard' },
]

// Preguntas de Verdad mejoradas
export const truthOrDareQuestions: Question[] = [
  // Fáciles
  { id: 1, text: "¿Cuál es tu mayor miedo?", tags: ['pre', 'bar'], difficulty: 'easy' },
  { id: 2, text: "¿Cuál es tu mayor secreto?", tags: ['pre', 'coqueto'], difficulty: 'easy' },
  { id: 3, text: "¿Cuál es tu mayor arrepentimiento?", tags: ['pre', 'after'], difficulty: 'easy' },
  { id: 4, text: "¿Cuál es tu mayor sueño?", tags: ['pre', 'bar'], difficulty: 'easy' },
  { id: 5, text: "¿Cuál es tu mayor logro?", tags: ['pre', 'locura'], difficulty: 'easy' },
  { id: 6, text: "¿Cuál es tu mayor debilidad?", tags: ['pre', 'coqueto'], difficulty: 'easy' },
  { id: 7, text: "¿Cuál es tu mayor fortaleza?", tags: ['pre', 'bar'], difficulty: 'easy' },
  { id: 8, text: "¿Cuál es tu mayor pasión?", tags: ['pre', 'locura'], difficulty: 'easy' },
  { id: 9, text: "¿Cuál es tu mayor obsesión?", tags: ['pre', 'coqueto'], difficulty: 'easy' },
  { id: 10, text: "¿Cuál es tu mayor adicción?", tags: ['pre', 'after'], difficulty: 'easy' },
  
  // Medianas
  { id: 11, text: "¿Cuál es tu mayor fantasía sexual?", tags: ['coqueto', 'locura'], difficulty: 'medium' },
  { id: 12, text: "¿Cuál es tu mayor experiencia sexual?", tags: ['coqueto', 'after'], difficulty: 'medium' },
  { id: 13, text: "¿Cuál es tu mayor experiencia con drogas?", tags: ['locura', 'after'], difficulty: 'medium' },
  { id: 14, text: "¿Cuál es tu mayor experiencia con alcohol?", tags: ['locura', 'bar'], difficulty: 'medium' },
  { id: 15, text: "¿Cuál es tu mayor experiencia con el sexo opuesto?", tags: ['coqueto', 'locura'], difficulty: 'medium' },
  { id: 16, text: "¿Cuál es tu mayor experiencia con el mismo sexo?", tags: ['coqueto', 'locura'], difficulty: 'medium' },
  { id: 17, text: "¿Cuál es tu mayor experiencia con alguien casado?", tags: ['coqueto', 'extremo'], difficulty: 'medium' },
  { id: 18, text: "¿Cuál es tu mayor experiencia con alguien de tu familia?", tags: ['extremo', 'after'], difficulty: 'medium' },
  { id: 19, text: "¿Cuál es tu mayor experiencia con tu jefe?", tags: ['coqueto', 'bar'], difficulty: 'medium' },
  { id: 20, text: "¿Cuál es tu mayor experiencia con alguien por dinero?", tags: ['extremo', 'after'], difficulty: 'medium' },
  
  // Difíciles
  { id: 21, text: "¿Cuál es tu mayor experiencia sexual con alguien de tu familia?", tags: ['extremo', 'after'], difficulty: 'hard' },
  { id: 22, text: "¿Cuál es tu mayor experiencia sexual con tu jefe?", tags: ['extremo', 'bar'], difficulty: 'hard' },
  { id: 23, text: "¿Cuál es tu mayor experiencia sexual con alguien por dinero?", tags: ['extremo', 'after'], difficulty: 'hard' },
  { id: 24, text: "¿Cuál es tu mayor experiencia sexual con alguien casado?", tags: ['extremo', 'locura'], difficulty: 'hard' },
  { id: 25, text: "¿Cuál es tu mayor experiencia sexual con alguien de tu mismo sexo?", tags: ['extremo', 'coqueto'], difficulty: 'hard' },
  { id: 26, text: "¿Cuál es tu mayor experiencia sexual con alguien de tu familia?", tags: ['extremo', 'after'], difficulty: 'hard' },
  { id: 27, text: "¿Cuál es tu mayor experiencia sexual con tu jefe?", tags: ['extremo', 'bar'], difficulty: 'hard' },
  { id: 28, text: "¿Cuál es tu mayor experiencia sexual con alguien por dinero?", tags: ['extremo', 'after'], difficulty: 'hard' },
  { id: 29, text: "¿Cuál es tu mayor experiencia sexual con alguien casado?", tags: ['extremo', 'locura'], difficulty: 'hard' },
  { id: 30, text: "¿Cuál es tu mayor experiencia sexual con alguien de tu mismo sexo?", tags: ['extremo', 'coqueto'], difficulty: 'hard' },
]

// Retos mejorados con referencias a nombres
export const truthOrDareChallenges: Challenge[] = [
  // Individuales - Fáciles
  { id: 1, text: "Besa a {randomPlayer} en la mejilla", tags: ['pre', 'coqueto'], difficulty: 'easy', type: 'individual' },
  { id: 2, text: "Dile a {randomPlayer} que es la persona más hermosa que has visto", tags: ['pre', 'coqueto'], difficulty: 'easy', type: 'individual' },
  { id: 3, text: "Déjate abrazar por {randomPlayer} durante 30 segundos", tags: ['pre', 'coqueto'], difficulty: 'easy', type: 'individual' },
  { id: 4, text: "Déjate besar por {randomPlayer} en el cuello", tags: ['coqueto', 'locura'], difficulty: 'easy', type: 'individual' },
  { id: 5, text: "Déjate besar por {randomPlayer} en la mano", tags: ['pre', 'coqueto'], difficulty: 'easy', type: 'individual' },
  { id: 6, text: "Déjate besar por {randomPlayer} en el brazo", tags: ['pre', 'coqueto'], difficulty: 'easy', type: 'individual' },
  { id: 7, text: "Déjate besar por {randomPlayer} en la pierna", tags: ['coqueto', 'locura'], difficulty: 'easy', type: 'individual' },
  { id: 8, text: "Déjate besar por {randomPlayer} en el pie", tags: ['coqueto', 'extremo'], difficulty: 'easy', type: 'individual' },
  { id: 9, text: "Déjate besar por {randomPlayer} en el hombro", tags: ['pre', 'coqueto'], difficulty: 'easy', type: 'individual' },
  { id: 10, text: "Déjate besar por {randomPlayer} en la espalda", tags: ['coqueto', 'locura'], difficulty: 'easy', type: 'individual' },
  
  // Individuales - Medianos
  { id: 11, text: "Besa a {randomPlayer} en los labios durante 10 segundos", tags: ['coqueto', 'locura'], difficulty: 'medium', type: 'individual' },
  { id: 12, text: "Déjate besar por {randomPlayer} en el cuello durante 30 segundos", tags: ['coqueto', 'after'], difficulty: 'medium', type: 'individual' },
  { id: 13, text: "Déjate besar por {randomPlayer} en el pecho", tags: ['coqueto', 'extremo'], difficulty: 'medium', type: 'individual' },
  { id: 14, text: "Déjate besar por {randomPlayer} en el estómago", tags: ['coqueto', 'extremo'], difficulty: 'medium', type: 'individual' },
  { id: 15, text: "Déjate besar por {randomPlayer} en la nalga", tags: ['coqueto', 'extremo'], difficulty: 'medium', type: 'individual' },
  { id: 16, text: "Déjate besar por {randomPlayer} en el muslo", tags: ['coqueto', 'extremo'], difficulty: 'medium', type: 'individual' },
  { id: 17, text: "Déjate besar por {randomPlayer} en la rodilla", tags: ['coqueto', 'extremo'], difficulty: 'medium', type: 'individual' },
  { id: 18, text: "Déjate besar por {randomPlayer} en el tobillo", tags: ['coqueto', 'extremo'], difficulty: 'medium', type: 'individual' },
  { id: 19, text: "Déjate besar por {randomPlayer} en el dedo del pie", tags: ['coqueto', 'extremo'], difficulty: 'medium', type: 'individual' },
  { id: 20, text: "Déjate besar por {randomPlayer} en el ombligo", tags: ['coqueto', 'extremo'], difficulty: 'medium', type: 'individual' },
  
  // Individuales - Difíciles
  { id: 21, text: "Besa a {randomPlayer} en los labios durante 1 minuto", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'individual' },
  { id: 22, text: "Déjate besar por {randomPlayer} en el cuello durante 2 minutos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'individual' },
  { id: 23, text: "Déjate besar por {randomPlayer} en el pecho durante 1 minuto", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'individual' },
  { id: 24, text: "Déjate besar por {randomPlayer} en el estómago durante 1 minuto", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'individual' },
  { id: 25, text: "Déjate besar por {randomPlayer} en la nalga durante 30 segundos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'individual' },
  { id: 26, text: "Déjate besar por {randomPlayer} en el muslo durante 1 minuto", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'individual' },
  { id: 27, text: "Déjate besar por {randomPlayer} en la rodilla durante 30 segundos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'individual' },
  { id: 28, text: "Déjate besar por {randomPlayer} en el tobillo durante 30 segundos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'individual' },
  { id: 29, text: "Déjate besar por {randomPlayer} en el dedo del pie durante 30 segundos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'individual' },
  { id: 30, text: "Déjate besar por {randomPlayer} en el ombligo durante 30 segundos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'individual' },
  
  // Grupales - Fáciles
  { id: 31, text: "Todos los jugadores deben besarse en la mejilla", tags: ['pre', 'coqueto'], difficulty: 'easy', type: 'group' },
  { id: 32, text: "Todos los jugadores deben abrazarse durante 30 segundos", tags: ['pre', 'coqueto'], difficulty: 'easy', type: 'group' },
  { id: 33, text: "Todos los jugadores deben darse la mano", tags: ['pre', 'bar'], difficulty: 'easy', type: 'group' },
  { id: 34, text: "Todos los jugadores deben chocar los cinco", tags: ['pre', 'bar'], difficulty: 'easy', type: 'group' },
  { id: 35, text: "Todos los jugadores deben hacer un brindis", tags: ['pre', 'bar'], difficulty: 'easy', type: 'group' },
  { id: 36, text: "Todos los jugadores deben cantar una canción", tags: ['pre', 'locura'], difficulty: 'easy', type: 'group' },
  { id: 37, text: "Todos los jugadores deben bailar durante 1 minuto", tags: ['pre', 'locura'], difficulty: 'easy', type: 'group' },
  { id: 38, text: "Todos los jugadores deben hacer una mueca", tags: ['pre', 'locura'], difficulty: 'easy', type: 'group' },
  { id: 39, text: "Todos los jugadores deben hacer una pose", tags: ['pre', 'locura'], difficulty: 'easy', type: 'group' },
  { id: 40, text: "Todos los jugadores deben hacer un gesto", tags: ['pre', 'locura'], difficulty: 'easy', type: 'group' },
  
  // Grupales - Medianos
  { id: 41, text: "Todos los jugadores deben besarse en los labios", tags: ['coqueto', 'locura'], difficulty: 'medium', type: 'group' },
  { id: 42, text: "Todos los jugadores deben abrazarse durante 2 minutos", tags: ['coqueto', 'locura'], difficulty: 'medium', type: 'group' },
  { id: 43, text: "Todos los jugadores deben bailar juntos", tags: ['coqueto', 'locura'], difficulty: 'medium', type: 'group' },
  { id: 44, text: "Todos los jugadores deben cantar juntos", tags: ['coqueto', 'locura'], difficulty: 'medium', type: 'group' },
  { id: 45, text: "Todos los jugadores deben hacer una coreografía", tags: ['coqueto', 'locura'], difficulty: 'medium', type: 'group' },
  { id: 46, text: "Todos los jugadores deben hacer una actuación", tags: ['coqueto', 'locura'], difficulty: 'medium', type: 'group' },
  { id: 47, text: "Todos los jugadores deben hacer una presentación", tags: ['coqueto', 'locura'], difficulty: 'medium', type: 'group' },
  { id: 48, text: "Todos los jugadores deben hacer una demostración", tags: ['coqueto', 'locura'], difficulty: 'medium', type: 'group' },
  { id: 49, text: "Todos los jugadores deben hacer una exhibición", tags: ['coqueto', 'locura'], difficulty: 'medium', type: 'group' },
  { id: 50, text: "Todos los jugadores deben hacer una muestra", tags: ['coqueto', 'locura'], difficulty: 'medium', type: 'group' },
  
  // Grupales - Difíciles
  { id: 51, text: "Todos los jugadores deben besarse en los labios durante 1 minuto", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'group' },
  { id: 52, text: "Todos los jugadores deben abrazarse durante 5 minutos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'group' },
  { id: 53, text: "Todos los jugadores deben bailar juntos durante 10 minutos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'group' },
  { id: 54, text: "Todos los jugadores deben cantar juntos durante 10 minutos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'group' },
  { id: 55, text: "Todos los jugadores deben hacer una coreografía durante 5 minutos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'group' },
  { id: 56, text: "Todos los jugadores deben hacer una actuación durante 5 minutos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'group' },
  { id: 57, text: "Todos los jugadores deben hacer una presentación durante 5 minutos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'group' },
  { id: 58, text: "Todos los jugadores deben hacer una demostración durante 5 minutos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'group' },
  { id: 59, text: "Todos los jugadores deben hacer una exhibición durante 5 minutos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'group' },
  { id: 60, text: "Todos los jugadores deben hacer una muestra durante 5 minutos", tags: ['coqueto', 'extremo'], difficulty: 'hard', type: 'group' },
]

// Jergas bolivianas
export const bolivianSlang = [
  {
    word: "Nové",
    meaning: "Amigo, compadre",
    example: "¡Qué tal nové! ¿Cómo estás?"
  },
  {
    word: "Chupar",
    meaning: "Beber alcohol",
    example: "Vamos a chupar un poco más"
  },
  {
    word: "Cañar",
    meaning: "Beber mucho alcohol",
    example: "Anoche cañamos demasiado"
  },
  {
    word: "Toro",
    meaning: "Valiente, fuerte",
    example: "Ese tipo es un toro"
  },
  {
    word: "Chaki",
    meaning: "Cansado, agotado",
    example: "Estoy chaki de tanto trabajar"
  },
  {
    word: "Cumpa",
    meaning: "Compadre, amigo cercano",
    example: "¡Hola cumpa! ¿Qué tal?"
  },
  {
    word: "Ñato/Ñata",
    meaning: "Persona de nariz pequeña",
    example: "Esa ñata es muy bonita"
  },
  {
    word: "Ch'alla",
    meaning: "Brindis, celebración",
    example: "Hagamos una ch'alla por el éxito"
  },
  {
    word: "Pijchear",
    meaning: "Masticar coca",
    example: "Vamos a pijchear un poco"
  },
  {
    word: "Ch'uspa",
    meaning: "Bolsa para la coca",
    example: "¿Tienes tu ch'uspa?"
  }
]

// Bebidas bolivianas
export const bolivianDrinks = [
  {
    name: "Chicha",
    description: "Bebida fermentada de maíz, tradicional de los Andes",
    region: "Andes",
    alcohol: true
  },
  {
    name: "Singani",
    description: "Aguardiente de uva, bebida nacional de Bolivia",
    region: "Tarija",
    alcohol: true
  },
  {
    name: "Chuflay",
    description: "Cóctel de Singani con ginger ale y limón",
    region: "Bolivia",
    alcohol: true
  },
  {
    name: "Mocochinchi",
    description: "Bebida refrescante de durazno deshidratado",
    region: "Bolivia",
    alcohol: false
  },
  {
    name: "Somó",
    description: "Bebida de maíz morado con canela",
    region: "Bolivia",
    alcohol: false
  },
  {
    name: "Api",
    description: "Bebida caliente de maíz morado con especias",
    region: "Bolivia",
    alcohol: false
  }
]

export const gameData = {
  modes: gameModes,
  types: gameTypes,
  neverHaveIEver: neverHaveIEverQuestions,
  truthOrDare: {
    questions: truthOrDareQuestions,
    challenges: truthOrDareChallenges,
  },
  bolivianSlang,
  bolivianDrinks,
}
