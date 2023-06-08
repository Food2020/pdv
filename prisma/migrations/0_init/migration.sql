-- CreateTable
CREATE TABLE `bairros` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `regiao` VARCHAR(50) NOT NULL,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cancelamentos` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `motivo` VARCHAR(255) NOT NULL,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cargos` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `descontos` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forma_pagamentos` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `idProduto` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `codigo` VARCHAR(255) NULL,
    `unidade` VARCHAR(255) NOT NULL,
    `categoria` VARCHAR(255) NOT NULL,
    `codigoBarra` VARCHAR(255) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `insumo` INTEGER NOT NULL,
    `venda` INTEGER NOT NULL,
    `composicao` INTEGER NOT NULL,
    `localEstoque` BIGINT NOT NULL,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`idProduto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxa_entregas` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `valor` FLOAT NOT NULL,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `cargo` VARCHAR(255) NULL,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parceiros` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `fone` VARCHAR(11) NOT NULL,
    `cep` VARCHAR(11) NOT NULL,
    `endereco` VARCHAR(50) NOT NULL,
    `numero` VARCHAR(11) NOT NULL,
    `cpfCnpj` VARCHAR(50) NOT NULL,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `razaoSocial` VARCHAR(100) NOT NULL,
    `ie` VARCHAR(20) NOT NULL,
    `im` VARCHAR(20) NOT NULL,
    `bairro` VARCHAR(100) NOT NULL,
    `cidade` VARCHAR(100) NOT NULL,
    `uf` VARCHAR(20) NOT NULL,
    `complemento` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parceiros_tipo` (
    `idParceiro` BIGINT NOT NULL,
    `tipo` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`idParceiro`, `tipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `local_estoque` (
    `idLocalEstoque` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `descricao` VARCHAR(250) NOT NULL,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`idLocalEstoque`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_produto` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(250) NOT NULL,
    `idProduto` INTEGER NOT NULL,
    `dataCriacao` DATETIME(6) NOT NULL,
    `dataAtualizacao` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto_composicao` (
    `idProdutoComposicao` BIGINT NOT NULL AUTO_INCREMENT,
    `idProduto` INTEGER NOT NULL,
    `produto` INTEGER NOT NULL,
    `quantidade` FLOAT NOT NULL,
    `dataCriacao` DATETIME(6) NOT NULL,
    `dataAtualizacao` DATETIME(6) NOT NULL,

    PRIMARY KEY (`idProdutoComposicao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entrada_manual` (
    `idEntradaManual` INTEGER NOT NULL AUTO_INCREMENT,
    `numNota` VARCHAR(255) NOT NULL,
    `dataEmissao` DATE NOT NULL,
    `dataEntrada` DATE NOT NULL,
    `idFornecedor` BIGINT NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`idEntradaManual`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entrada_manual_item` (
    `idEntradaManualItem` BIGINT NOT NULL AUTO_INCREMENT,
    `idEntradaManual` BIGINT NOT NULL DEFAULT 0,
    `idProduto` BIGINT NOT NULL DEFAULT 0,
    `qtd` DECIMAL(10, 4) NOT NULL DEFAULT 0.0000,
    `valorUnit` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `ativo` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`idEntradaManualItem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

