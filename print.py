import os
import sys

def print_tree_and_contents(path, indent="", output_lines=None):
    for item in os.listdir(path):
        item_path = os.path.join(path, item)
        output_lines.append(f"{indent}├── {item}")
        
        if os.path.isdir(item_path):
            print_tree_and_contents(item_path, indent + "│   ", output_lines)
        else:
            try:
                with open(item_path, "r", encoding="utf-8") as f:
                    content = f.read()
                content_lines = content.splitlines()
                output_lines.append(f"{indent}│   └── Conteúdo de {item}:")
                for line in content_lines:
                    output_lines.append(f"{indent}│       {line}")
            except Exception as e:
                output_lines.append(f"{indent}│   [Erro ao ler o arquivo: {e}]")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python3 print.py <caminho_da_pasta> <arquivo_de_saida>")
        sys.exit(1)

    caminho = sys.argv[1]
    arquivo_saida = sys.argv[2]

    if not os.path.isdir(caminho):
        print(f"Erro: {caminho} não é um diretório válido.")
        sys.exit(1)

    output = [f"Árvore de: {caminho}"]
    print_tree_and_contents(caminho, output_lines=output)

    with open(arquivo_saida, "w", encoding="utf-8") as f:
        f.write("\n".join(output))

    print(f"Saída gravada em {arquivo_saida}")
