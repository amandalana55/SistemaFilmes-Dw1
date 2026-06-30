CREATE TABLE filmes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    ano INTEGER NOT NULL,

	CONSTRAI
);

CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    filme_id INTEGER NOT NULL,
    nota INTEGER NOT NULL CHECK (nota >= 1 AND nota <= 5),

    CONSTRAINT fk_filme
        FOREIGN KEY (filme_id)
        REFERENCES filmes(id)
        ON DELETE CASCADE
);

INSERT INTO filmes (titulo, genero, ano)
VALUES
('Five Nights at Freddys: O pesadelo sem fim', 'Terror', 2023),
('Barbie: Moda e magia', 'Infantil/aventura', 2010),
('Legalmente loira', 'Comédia/romance', 2001),
('De repente 30', 'Comédia/romance', 2004),
('Terrifier', 'Terror', 2016),
('Euphoria', 'Drama', 2019);