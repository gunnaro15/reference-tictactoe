## Test Examples

**1. Create game command**

Given []  
When [CreateGame]  
Then [GameCreated]

**2. Join game command**

Given [GameCreated]  
When [JoinGame]  
Then [GameJoined]

Given [GameCreated, GameJoined]  
When [JoinGame]  
Then [FullGameJoinAttempted]

**3. Place move command**

Given [GameCreated, GameJoined]  
When [PlaceMove(0,0,X)]  
Then [MovePlaced(0,0,X)]

Given [GameCreated, GameJoined, MovePlaced(0,0,X)]  
When [PlaceMove(0,0,O)]  
Then [IllegalMove]

Given [GameCreated, GameJoined, MovePlaced(0,0,X)]  
When [PlaceMove(1,0,X)]  
Then [NotYourMove]

Given [GameCreated, GameJoined, MovePlaced(0,0,X), MovePlaced(2,0,O), MovePlaced(0,1,X), MovePlaced(2,1,O)]  
When [PlaceMove(0,2,X)]  
Then [MovePlaced(0,2,X), GameWon(X)]

Given [GameCreated, GameJoined, MovePlaced(0,0,X), MovePlaced(0,2,O), MovePlaced(1,0,X), MovePlaced(1,2,O)]  
When [PlaceMove(2,0,X)]  
Then [MovePlaced(2,0,X), GameWon(X)]

Given [GameCreated, GameJoined, MovePlaced(0,0,X), MovePlaced(0,2,O), MovePlaced(1,1,X), MovePlaced(2,0,O)]  
When [PlaceMove(2,2,X)]  
Then [MovePlaced(2,2,X), GameWon(X)]

Given [GameCreated, GameJoined, MovePlaced(0,0,X), MovePlaced(0,2,O), MovePlaced(2,2,X), MovePlaced(1,1,O), MovePlaced(0,1,X)]  
When [PlaceMove(2,0,O)]  
Then [MovePlaced(2,0,O), GameWon(O)]

Given [GameCreated, GameJoined, MovePlaced(0,1,X), MovePlaced(0,0,O), MovePlaced(1,1,X), MovePlaced(0,2,O), MovePlaced(1,2,X), MovePlaced(1,0,O), MovePlaced(2,0,X), MovePlaced(2,1,O)]  
When [PlaceMove(2,2,X)]  
Then [MovePlaced(2,2,X), GameDraw(X)]
