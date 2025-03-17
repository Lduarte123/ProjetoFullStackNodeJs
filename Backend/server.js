import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;
const __dirname = path.resolve();
const __diritens = path.join(__dirname, "data", "itens.json");

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("hello world");
})

app.get("/api/itens", (req, res) => {
    try{
        fs.readFile(__diritens, (err, data) =>{
            if(err) {
                return res.status(500).json("Error", err);
            }if(data){
                const dataJson = JSON.parse(data);
                if(dataJson.length > 0){
                    return res.status(200).json(dataJson);
                }else{
                    return res.status(404).json({ message: "No itens found"});
                }
            }
        })
    }catch(error){
        return res.status(500).json({ message: `${error}` });
    }
});
app.get("/api/itens/:id", (req, res) => {
    const idEscolhido = req.params.id;

    // Verificando se o id foi fornecido
    if (!idEscolhido) {
        return res.status(400).json({ message: "id is required" });
    }

    try {
        // Leitura do arquivo
        fs.readFile(__diritens, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error", err });
            }

            // Parsing do JSON
            const dataJson = JSON.parse(data);

            // Filtrando o item com o id
            const itemEncontrado = dataJson.filter((item) => item.id == idEscolhido);

            // Caso o item não seja encontrado
            if (itemEncontrado.length === 0) {
                return res.status(404).json({ message: "Item não encontrado" });
            }

            // Caso o item seja encontrado
            return res.status(200).json(itemEncontrado[0]);
        });
    } catch (err) {
        return res.status(500).json({ message: "Erro ao executar operação", error: err });
    }
});

app.post("/api/itens", (req, res) => {
    const novoItem = req.body;
    if (!novoItem) {
        return res.status(400).json({ message: "corpo de envio invalido" });
        }
    try{
        fs.readFile(__diritens, (err, data)){
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error", err });
                }
            else{
                if(!novoItem.nome || !novoItem.preco || !novoItem.quantidade){
                    return res.status(400).json({ message: "nome, preco e quantidade são obrigató
                        rios" });
                        }
                const dataJson = JSON.parse(data);
                
            }
        }
    }
    catch{
        return res.status(500).json({ message: "Erro ao executar operação" });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
