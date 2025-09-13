// Datos de regiones y comunas de Chile
const regionesChile = [
    {
        id: 1,
        nombre: 'Región de Tarapacá',
        comunas: [
            'Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'
        ]
    },
    {
        id: 2,
        nombre: 'Región de Antofagasta',
        comunas: [
            'Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama',
            'Tocopilla', 'María Elena'
        ]
    },
    {
        id: 3,
        nombre: 'Región de Atacama',
        comunas: [
            'Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Alto del Carmen',
            'Freirina', 'Huasco'
        ]
    },
    {
        id: 4,
        nombre: 'Región de Coquimbo',
        comunas: [
            'La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paiguano', 'Vicuña', 'Illapel', 'Canela',
            'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado'
        ]
    },
    {
        id: 5,
        nombre: 'Región de Valparaíso',
        comunas: [
            'Valparaíso', 'Casablanca', 'Concón', 'Juan Fernández', 'Puchuncaví', 'Quintero', 'Viña del Mar',
            'Isla de Pascua', 'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban', 'La Ligua', 'Cabildo',
            'Papudo', 'Petorca', 'Zapallar', 'Quillota', 'Calera', 'Hijuelas', 'La Cruz', 'Nogales', 'San Antonio',
            'Algarrobo', 'Cartagena', 'El Quisco', 'El Tabo', 'Santo Domingo', 'San Felipe', 'Catemu', 'Llaillay',
            'Panquehue', 'Putaendo', 'Santa María', 'Quilpué', 'Limache', 'Olmué', 'Villa Alemana'
        ]
    },
    {
        id: 6,
        nombre: 'Región del Libertador Gral. Bernardo O\'Higgins',
        comunas: [
            'Rancagua', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'Las Cabras', 'Machalí', 'Malloa',
            'Mostazal', 'Olivar', 'Peumo', 'Pichidegua', 'Quinta de Tilcoco', 'Rengo', 'Requínoa', 'San Vicente',
            'Pichilemu', 'La Estrella', 'Litueche', 'Marchihue', 'Navidad', 'Santa Cruz', 'Chépica', 'Chimbarongo',
            'Lolol', 'Nancagua', 'Palmilla', 'Peralillo', 'Placilla', 'Pumanque', 'San Fernando'
        ]
    },
    {
        id: 7,
        nombre: 'Región del Maule',
        comunas: [
            'Talca', 'ConsVtución', 'Curepto', 'Empedrado', 'Maule', 'Pelarco', 'Pencahue', 'Río Claro', 'San Clemente',
            'San Rafael', 'Cauquenes', 'Chanco', 'Pelluhue', 'Curicó', 'Hualañé', 'Licantén', 'Molina', 'Rauco',
            'Romeral', 'Sagrada Familia', 'Teno', 'Vichuquén', 'Linares', 'Colbún', 'Longaví', 'Parral', 'ReVro',
            'San Javier', 'Villa Alegre', 'Yerbas Buenas'
        ]
    },
    {
        id: 8,
        nombre: 'Región del Biobío',
        comunas: [
            'Concepción', 'Coronel', 'Chiguayante', 'Florida', 'Hualpén', 'Hualqui', 'Lota', 'Penco', 'San Pedro de la Paz',
            'Santa Juana', 'Talcahuano', 'Tomé', 'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Lebu', 'Los Álamos',
            'Tirúa', 'Los Ángeles', 'Antuco', 'Cabrero', 'Laja', 'Mulchén', 'Nacimiento', 'Negrete', 'Quilaco',
            'Quilleco', 'San Rosendo', 'Santa Bárbara', 'Tucapel', 'Yumbel', 'Alto Biobío'
        ]
    },
    {
        id: 9,
        nombre: 'Región de la Araucanía',
        comunas: [
            'Temuco', 'Carahue', 'Cunco', 'Curarrehue', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche',
            'Melipeuco', 'Nueva Imperial', 'Padre las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Saavedra',
            'Teodoro Schmidt', 'Toltén', 'Vilcún', 'Villarrica', 'Cholchol', 'Angol', 'Collipulli', 'Curacautín',
            'Ercilla', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Purén', 'Renaico', 'Traiguén', 'Victoria'
        ]
    },
    {
        id: 10,
        nombre: 'Región de Los Lagos',
        comunas: [
            'Puerto Montt', 'Calbuco', 'Cochamó', 'Fresia', 'Frutillar', 'Los Muermos', 'Llanquihue', 'Maullín', 'Puerto Varas',
            'Castro', 'Ancud', 'Chonchi', 'Curaco de Vélez', 'Dalcahue', 'Puqueldón', 'Queilén', 'Quellón', 'Quemchi',
            'Quinchao', 'Osorno', 'Puerto Octay', 'Purranque', 'Puyehue', 'Río Negro', 'San Juan de la Costa', 'San Pablo',
            'Chaitén', 'Futaleufú', 'Hualaihué', 'Palena'
        ]
    },
    {
        id: 11,
        nombre: 'Región Aysén del Gral. Carlos Ibáñez del Campo',
        comunas: [
            'Coihaique', 'Lago Verde', 'Aysén', 'Cisnes', 'Guaitecas', 'Cochrane', 'O\'Higgins', 'Tortel',
            'Chile Chico', 'Río Ibáñez'
        ]
    },
    {
        id: 12,
        nombre: 'Región de Magallanes y de la Antártica Chilena',
        comunas: [
            'Punta Arenas', 'Laguna Blanca', 'Río Verde', 'San Gregorio', 'Cabo de Hornos', 'Antártica', 'Porvenir',
            'Primavera', 'Timaukel', 'Natales', 'Torres del Paine'
        ]
    },
    {
        id: 13,
        nombre: 'Región Metropolitana de Santiago',
        comunas: [
            'Santiago', 'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central', 'Huechuraba',
            'Independencia', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Las Condes',
            'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén',
            'Providencia', 'Pudahuel', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín', 'San Miguel',
            'San Ramón', 'Vitacura', 'Puente Alto', 'Pirque', 'San José de Maipo', 'Colina', 'Lampa', 'TilVl',
            'San Bernardo', 'Buin', 'Calera de Tango', 'Paine', 'Melipilla', 'Alhué', 'Curacaví', 'María Pinto',
            'San Pedro', 'Talagante', 'El Monte', 'Isla de Maipo', 'Padre Hurtado', 'Peñaflor'
        ]
    },
    {
        id: 14,
        nombre: 'Región de Los Ríos',
        comunas: [
            'Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'La Unión',
            'Futrono', 'Lago Ranco', 'Río Bueno'
        ]
    },
    {
        id: 15,
        nombre: 'Región de Arica y Parinacota',
        comunas: [
            'Arica', 'Camarones', 'Putre', 'General Lagos'
        ]
    },
    {
        id: 16,
        nombre: 'Región de Ñuble',
        comunas: [
            'Chillán', 'Bulnes', 'Chillán Viejo', 'El Carmen', 'Pemuco', 'Pinto', 'Quillón', 'San Ignacio', 'Yungay',
            'Coelemu', 'Coihueco', 'Ñiquén', 'San Carlos', 'San Fabián', 'San Nicolás'
        ]
    }
];