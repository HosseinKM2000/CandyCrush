# CandyCrush
##The overall structure of the project

global varables #bold
The global variables of this project include: the list of colors or shapes in the game,
an empty array to which the rows of the game are added called the board, the rows that specify the number of rows,
the columns that specify the number of columns, the score, the current tile, and other tiles.

startGame function #bold
The start game function includes a loop that is scrolled based on the number of rows and has another loop inside itself that is scrolled based on the columns.
The second loop adds random game elements with certain specifications to a local array inside the first loop,
and the first loop adds this list to the global list of the board after each complete execution of the second loop.
The second loop also adds elements to the DOM

drag and drop #bold
When dragging an element, that element is dropped into the variable of the current tile,
and when dropping the target or second element into the variable of another tile, when the drag and drop is finished,
the column and row position of the current tile and the other tile, which was previously determined by the ID, are taken,
and if both tiles are adjacent to each other in the same direction, they are allowed to move.

check valid #bold
This method checks the elements of the lists in the board in groups of three and returns true if there are three similar elements either in column or row,
but if there are no three similar elements or if the similar elements are blank, it returns false.

crushThree #bold
This method checks that if there are three similar elements and not of the blank type in column or row mode, it changes them to the blank type and adds to the score.

