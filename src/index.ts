import { createServer } from "./server";
import synonymWordService from "./services/synonym-service";

synonymWordService.addWord('apple');
synonymWordService.addWord('banana');
synonymWordService.addWord('orange');
synonymWordService.addWord('peach');

synonymWordService.union('apple', 'banana');
synonymWordService.union('apple', 'peach');
synonymWordService.union('apple', 'tank');
synonymWordService.union('apple', 'bread');
synonymWordService.union('apple', 'breadboxess');
synonymWordService.union('apple', 'dseee');
synonymWordService.union('orange', 'banana');

const port = process.env.PORT || 4000;
const server = createServer();

server.listen(port, () => {
  console.log(`API running on ${port}`);
});
