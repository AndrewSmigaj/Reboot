//In ai.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "MTE3OTkyNzExMDk5MTc0MDk4OA.GFM3h_.vHuALUV6lU36xHX0qd6w9cAGXe0N4uCmGqPRpw" // This is also the default, can be omitted
});

async function ask(prompt) {
    const response = await openai.ChatCompletion.create({({
        model: "gpt-3.5-turbo",
        prompt,
        max_tokens: 256
    });
    const answer = response.data.choices[0].text;
    return answer;
}
//Export the "ask" function
module.exports = {
    ask,
};
