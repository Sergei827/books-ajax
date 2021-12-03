<?php

namespace Data;

class Books
{
	protected $books = [];
	

	/**
	 * Приймає массив данних 
	 * 
	 * @param array $books
	 * @return void
	 */
	public function __construct(array $books)
	{
		if(count($books) > 0)
		{
			$this->books = $books;
		}	
	}
	

	/**
	 * Приймає стрічку з назвою жанру
	 * і на її основі фільтрує массив данних
	 * Повертає массив книжок з вказанним жанром
	 * 
	 * @param string $books
	 * @return array $booksByGenre
	 */
	public function giveBooksByGenre(string $genre):array
	{
		$booksByGenre = [];
		
		$i = 0;
		foreach($this->books as $book)
		{
			if($book['genre'] === $genre)
			{
				$booksByGenre[$i] = $book;
				$i++;
			}
		}
		
		return $booksByGenre;
	}
	

	
	/**
	 * Приймає стрічки з назвою книги,
	 * імям автора та назвою жанру
	 * Повертає true або false 
	 * 
	 * @param string $title
	 * @param string $author
	 * @param string $genre
	 * 
	 * @return bool
	 */
	public function putBook(string $title, string $author, string $genre):bool
	{
		$book = [];
		
		if(!empty($title) && !empty($author) && !empty($genre))
		{
			$book['title'] = $title;
			$book['author'] = $author;
			$book['genre'] = $genre;
			
			$this->books[] = $book;
			
			return true;
		}
        else{
			return false;
		}		
		
	}
}