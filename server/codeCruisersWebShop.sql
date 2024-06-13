-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: db
-- Tid vid skapande: 13 jun 2024 kl 17:43
-- Serverversion: 10.6.17-MariaDB-1:10.6.17+maria~ubu2004
-- PHP-version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `codeCruisersWebShop`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `books`
--

CREATE TABLE `books` (
  `bookId` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `text` text NOT NULL,
  `levelId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `books`
--

INSERT INTO `books` (`bookId`, `title`, `author`, `text`, `levelId`) VALUES
(1, 'The Coven\'s Prophecy', 'Isolde Ravenshadow', 'In the heart of the ancient forest, where shadows danced with whispers of forgotten magic, lived a coven of witches. These witches, sisters bound by blood and enchantment, dwelled in a moss-covered cottage hidden from the eyes of ordinary folk. Their days were spent weaving spells from the moonlight, crafting potions that could heal or harm, and communing with the spirits of the woods. One fateful night, as the full moon cast an eerie glow over the forest, the youngest witch, Elara, discovered a prophecy inscribed on a hidden scroll. It spoke of a time when darkness would seek to consume the light, and only the unity of the coven could restore balance. With the fate of their world hanging in the balance, the witches prepared for a battle unlike any they had faced before, their hearts intertwined with the hope and fear that only the unknown future could bring.', 2),
(2, 'The Song of the Abyss', 'Thalassa Deepwater', 'Beneath the tranquil surface of the ocean, where sunlight barely penetrated, lay a world of mystery and wonder. In the inky darkness of the abyss, bioluminescent creatures glowed like stars, weaving a tapestry of light in the eternal night. Among them swam Nerida, a siren of the deep, whose voice could soothe the fiercest of storms. One day, she discovered an ancient conch shell, its spiral etched with runes of old. When she sang into the shell, it resonated with a melody that spoke of lost cities and forgotten treasures. With this newfound power, Nerida set out to uncover the secrets of the ocean\'s depths, guided by the haunting song that echoed through the watery expanse.', 3),
(3, 'The Ghosts of Cypress Hollow', 'Magnolia Thorne', 'In the murky depths of the Louisiana bayou, where cypress trees loomed like sentinels and the air was thick with the scent of decay, a legend whispered among the locals. They spoke of Cypress Hollow, a place where the veil between the living and the dead was thin. Eloise, a young woman with a heart full of curiosity and courage, ventured into the swamp to uncover the truth. As she navigated the labyrinth of moss-draped trees and sluggish waters, she encountered spectral figures who revealed tales of love, loss, and redemption. Through their stories, Eloise discovered that the bayou was not a place of fear, but a realm of forgotten souls seeking peace.', 1),
(4, 'The Enchanted Glade', 'Sylvana Greenleaf', 'Deep within the heart of an ancient forest, where sunlight filtered through the canopy in golden shafts, lay an enchanted glade. This secluded haven was home to mystical creatures—fairies, sprites, and gentle forest spirits. Among them was Liora, a guardian of the glade, whose magic nurtured the trees and flowers. One day, a human child stumbled into the glade, lost and afraid. Liora, with her gentle heart, took the child under her wing, revealing the wonders of the forest and teaching the child the ways of nature. Through this bond, the enchanted glade\'s magic grew stronger, and the child\'s laughter echoed through the woods, a testament to the harmony between humans and the mystical beings of the forest.', 2),
(5, 'The Fox\'s Frolic', 'Reynard Swiftpaw', 'In a secluded, sun-dappled glen, where the grass was lush and the flowers bloomed in riotous color, a clever fox named Finn reveled in the joy of life. Each day, Finn would leap and bound through the glade, his red fur a blur of motion and mischief. One sunny afternoon, he discovered a hidden burrow filled with ancient artifacts—a relic of a long-forgotten civilization. Intrigued by his find, Finn began to piece together the story of the glade\'s past, all the while continuing his playful antics. His discovery brought the attention of other woodland creatures, and together they celebrated the glade\'s history with dances and feasts, honoring the spirits of those who once lived there.', 3),
(6, 'The Ballad of the Forest Wanderer', 'Willow Hart', 'In a weathered trailer nestled at the edge of the forest, lived a woman named Marigold, whose voice could captivate anyone who heard it. Each evening, as the sun dipped below the horizon, Marigold would sing haunting ballads that echoed through the trees, drawing curious animals and enchanted beings to her doorstep. Her songs told stories of love, heartache, and dreams long forgotten. One night, a mysterious traveler arrived, drawn by her enchanting voice. He shared tales of his own adventures, and together they wove a tapestry of song and story that bound their souls. Marigold\'s trailer became a beacon of warmth and magic, a place where the power of music bridged the gap between the mundane and the mystical.', 1),
(7, 'The Enchanted Bookstore', 'Elara Spellbound', 'Deep within the labyrinthine streets of the old town, there was a bookstore that seemed to appear only to those who truly needed it. The shelves were filled with ancient tomes and magical grimoires, their pages whispering secrets to anyone brave enough to listen. One evening, a young girl named Lila stumbled upon the store while seeking refuge from a storm. The kindly old shopkeeper, with a twinkle in her eye, handed her a dusty book bound in emerald green. As Lila opened it, she was transported to a world where the words on the pages came alive, leading her on an adventure that would forever change her destiny.', 2),
(8, 'Witches of the Whispering Woods', 'Thorne Blackwood', 'In the heart of the Whispering Woods, where the trees seemed to murmur and conspire, lived a coven of witches. Their power was drawn from the very essence of the forest, and they used their magic to protect it from those who sought to exploit its secrets. One day, a young witch named Seraphina discovered an ancient spellbook hidden in the roots of a colossal oak. The book revealed a prophecy that spoke of a great darkness threatening to engulf the woods. With the help of her coven and the forest\'s spirits, Seraphina embarked on a perilous journey to thwart the looming evil.', 1),
(9, 'The Haunted Swamp', 'Bram Mossgrave', 'Just beyond the borders of the sleepy village lay a swamp shrouded in perpetual mist. Locals spoke of ghostly figures and eerie lights that danced upon the murky waters at night. One moonlit evening, an adventurous scholar named Elias ventured into the swamp, determined to uncover its mysteries. He stumbled upon an old, abandoned cabin where he found a journal belonging to a witch who had once lived there. The journal told of her tragic love story and the curse she had placed upon the swamp to guard her secrets. As Elias read the final entry, he felt the witch\'s presence guiding him to a hidden treasure that would lift the curse forever.', 2),
(10, 'The Sorcerer\'s Tree', 'Rowan Feywood', 'In a secluded glade, where the sunlight barely pierced the thick canopy, stood an ancient tree known as the Sorcerer\'s Tree. It was said that a powerful sorcerer had transformed into the tree to guard the forest\'s heart. One day, a wandering bard named Lyra found herself drawn to the glade by an enchanting melody. At the tree\'s base, she discovered a hollow filled with scrolls and magical artifacts. As she played her lute, the tree began to speak, revealing its true identity and imploring her to find a worthy successor to protect the forest. Lyra accepted the quest, her music now intertwined with the tree\'s ancient magic.', 3),
(11, 'The Bewitched Bookshop', 'Cassian Moonshadow', 'Nestled between two nondescript buildings in the bustling city was a bookshop that only appeared at dusk. The Bewitched Bookshop, as it was known, was run by an enigmatic figure named Thalia. She had the uncanny ability to recommend the perfect book for anyone who entered, each tome imbued with a little bit of magic. One evening, a lonely writer named Jasper visited the shop. Thalia handed him a book that seemed to glow faintly. As he read, the characters and settings of his dreams came to life, guiding him on a path of self-discovery and healing. By the time dawn broke, Jasper had found the inspiration he needed to write his greatest work yet.', 2),
(12, 'The Cursed Codex', 'Morgana Darke', 'Hidden in the depths of the Arcane Swamp was a codex said to contain the darkest of spells. Many had tried to retrieve it, but none had returned. A daring sorceress named Elara, determined to prove her prowess, set out to find the Cursed Codex. After days of navigating treacherous terrain and battling supernatural creatures, she found the book guarded by the spirits of those who had perished seeking it. The codex offered Elara immense power but at a great cost. She chose instead to break the curse, freeing the trapped souls and restoring balance to the swamp. In doing so, Elara earned the respect of the magical community and the gratitude of the spirits.', 1);

-- --------------------------------------------------------

--
-- Tabellstruktur `subscriptionLevels`
--

CREATE TABLE `subscriptionLevels` (
  `levelId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `stripePriceId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `subscriptionLevels`
--

INSERT INTO `subscriptionLevels` (`levelId`, `name`, `price`, `stripePriceId`) VALUES
(1, 'Level1', 100, 'price_1POKXiEplf7W51DdWrQcKgOB'),
(2, 'Level2', 200, 'price_1POK1FEplf7W51DdDX7Kj16Z'),
(3, 'Level3', 300, 'price_1POK1jEplf7W51DdbHr4torc');

-- --------------------------------------------------------

--
-- Tabellstruktur `subscriptions`
--

CREATE TABLE `subscriptions` (
  `subscriptionId` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `levelId` int(11) NOT NULL,
  `paymentStatus` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `stripeSubscriptionId` varchar(100) NOT NULL,
  `isActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `subscriptions`
--

INSERT INTO `subscriptions` (`subscriptionId`, `price`, `levelId`, `paymentStatus`, `email`, `startDate`, `endDate`, `stripeSubscriptionId`, `isActive`) VALUES
(52, 20000, 2, 'paid', 'code1@gmail.com', '2024-06-11', '2024-06-18', 'sub_1PQUFNEplf7W51Dds5AuWZF6', 1),
(53, 30000, 3, 'paid', 'sally@gmail.com', '2024-06-12', '2024-06-19', 'sub_1PQreZEplf7W51DdjlHojcS6', 1),
(61, 20000, 2, 'paid', 'nelson@gmail.com', '2024-06-12', '2024-06-19', 'sub_1PQs3wEplf7W51DdZ3My8Ex2', 1),
(63, 30000, 3, 'paid', 'svea@gmail.com', '2024-06-12', '2024-06-19', 'sub_1PQsQyEplf7W51Dd3VveaUVb', 1),
(67, 30000, 3, 'paid', 'jennika2@gmail.com', '2024-06-13', '2024-06-20', 'sub_1PR8w3Eplf7W51DdPOADE9UE', 1),
(69, 20000, 2, 'unpaid', 'jag@gmail.com', '2024-06-13', '2024-06-20', 'sub_1PR9BWEplf7W51DdaxdK8feO', 0),
(73, 30000, 3, 'paid', 'a@gmail.com', '2024-06-13', '2024-06-20', 'sub_1PRAwDEplf7W51Dd1bLqZUog', 1);

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`firstName`, `lastName`, `email`, `address`, `password`, `isAdmin`) VALUES
('Elisabeth', 'Elisson', 'a@gmail.com', 'Street', '$2b$10$4ETuDdXEiDGY9qSdLR818.FEJfXZBH/eT.OjlbuIFqQJNF2.zZW0S', 0),
('Code', 'Cruiser', 'code1@gmail.com', 'Street', '$2b$10$3eR8LbeBxk6knhabh9M1f.9R5snkTXRgkyoC9uOgNejBgHpTkXlDu', 0),
('Jenny', 'Efternamn', 'j@gmail.com', 'Street', '$2b$10$ZyQUq8kygY2zIcNoUnPuAeF9rpKnPQBVvvBMINecepTRpEzjxmF.G', 0),
('Firstname', 'Lastname', 'jag@gmail.com', 'Street name', '$2b$10$9OPOEnm.xfZU1nRwm0uX2ekR/1Jq9vrgb1VrHpOGUhvOkDRjzs8G2', 0),
('Jennika1', 'Elisson1', 'jennika1@gmail.com', 'street1', '$2b$10$ncdVEdkJ1esJiE3qasTxd.NR./7DWVyElerG0ua6PkZ7UaYTf8ZAC', 0),
('Jennika2', 'Elisson2', 'jennika2@gmail.com', 'street1', '$2b$10$fh0XkgiXc1kI8VoUt.tEW.qxzxfdeIR7O6w3oIXlbjhi3TKtfsDbC', 0),
('Jennika3', 'Elisson3', 'jennika3@gmail.com', 'street3', '$2b$10$.yPMfeOumzyoX7a95yoULeYJIIqG3lPltGMO/nvRX7BHibKFk8upi', 0),
('Jennika4', 'Elisson4', 'jennika4@gmail.com', 'Street4', '$2b$10$ZV3DajDQK/tq7jBEFpgNiupJBQ/amt19AaiVad2VUmVOQLb08AEBy', 0),
('Kornelia', 'A', 'K1@gmail.com', 'Street', '$2b$10$y5ncJsnAYiGtRvUu3gS7uuiVenWhsG3K90M9Ar15/m9s/dhVygw0e', 0),
('Nelson', 'Nelsonsson', 'nelson@gmail.com', 'Street', '$2b$10$rHlHx/jmfN.CTpXnfn0yfuXS5myWC8vUhB.tbtdgf4U7TzbFZM/iK', 1),
('Sally', 'Elisson', 'sally@gmail.com', 'street1', '$2b$10$I1nbovNeDbTseOp0W7MfHO.0w/maXU4X116j1fLU2L7X2oEsEkwl2', 0),
('Svea', 'Elisson', 'svea@gmail.com', '12', '$2b$10$KqnAqM6QwN0pTlhVHDRH0ObArcTFf2FvcjfJSbyUaq0XibPd9p7FS', 0);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`bookId`),
  ADD KEY `levelId` (`levelId`);

--
-- Index för tabell `subscriptionLevels`
--
ALTER TABLE `subscriptionLevels`
  ADD PRIMARY KEY (`levelId`);

--
-- Index för tabell `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`subscriptionId`),
  ADD KEY `email` (`email`),
  ADD KEY `levelId` (`levelId`);

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `books`
--
ALTER TABLE `books`
  MODIFY `bookId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT för tabell `subscriptionLevels`
--
ALTER TABLE `subscriptionLevels`
  MODIFY `levelId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT för tabell `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `subscriptionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`levelId`) REFERENCES `subscriptionLevels` (`levelId`);

--
-- Restriktioner för tabell `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`levelId`) REFERENCES `subscriptionLevels` (`levelId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
