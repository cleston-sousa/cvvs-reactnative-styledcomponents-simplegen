#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { argv } = yargs(hideBin(process.argv))
  .usage("Usage: $0 -c <component_name> -p <path>")
  .option("c", {
    alias: "component",
    describe: "The Component Name.",
    nargs: 1,
    demandOption: true,
  })
  .option("p", {
    alias: "path",
    describe: "The path to file to create.",
    nargs: 1,
    demandOption: true,
  })
  .option("e", {
    alias: "extension",
    describe: "The file extension.",
    default: "ts",
    nargs: 1,
    demandOption: true,
  })
  .describe("help", "Show help.")
  .describe("version", "Show version.");

const createDir = (dirPath) => {
  return fs.mkdirSync(dirPath, { recursive: true }, (error) => {
    if (error) {
      console.error("An error occurred: ", error);
    } else {
      console.log(`Directory ${dirPath} created!`);
    }
  });
};

const createFile = (filePath, fileContent) => {
  fs.writeFile(filePath, fileContent, (error) => {
    if (error) {
      console.error("An error occurred: ", error);
    } else {
      console.log(`File ${filePath} created.`);
    }
  });
};

const arrayPath = String(argv.p).split(/[\\\/]/);
arrayPath.push(argv.c);
//console.log(arrayPath);
var dirnamePath = [process.cwd()];
var fullPathArray = dirnamePath.concat(arrayPath);
//const pathObject = path.join(__dirname, fullPathArray);process.cwd().
const folderPath = path.join.apply(null, fullPathArray);
//console.log(folderPath);
//const resultDir =
if (fs.existsSync(folderPath)) {
  console.log(`Nothing to create:`);
  console.log(`Directory ${folderPath} already exists.`);
  process.exit(0);
}
createDir(folderPath);
//const resultDir = createDir(argv.p);
const componentPath = path.join(folderPath, `index.${argv.e}x`);
//console.log(componentPath);
const stylesPath = path.join(folderPath, `styles.${argv.e}`);
//console.log(stylesPath);

const componentContent =
  "import React from 'react';" +
  "\n" +
  "\n" +
  "import { Container, Title } from './styles';" +
  "\n" +
  "\n" +
  "interface IProps {" +
  "\n" +
  "  title: string;" +
  "\n" +
  "  onPress: () => void;" +
  "\n" +
  "  type: 'up' | 'down';" +
  "\n" +
  "}" +
  "\n" +
  "\n" +
  "export function Button({ title, onPress, type, ...rest }: IProps) {" +
  "\n" +
  "  return (" +
  "\n" +
  "    <Container onLayout={onPress} type={type} {...rest}>" +
  "\n" +
  "      <Title type={type}>{title}</Title>" +
  "\n" +
  "    </Container>" +
  "\n" +
  "  );" +
  "\n" +
  "}";

const stylesContent =
  "import styled, { css } from 'styled-components/native';" +
  "\n" +
  "import { RFValue } from 'react-native-responsive-fontsize';" +
  "\n" +
  "\n" +
  "export interface ITypeProps {" +
  "\n" +
  "  type: 'up' | 'down';" +
  "\n" +
  "}" +
  "\n" +
  "\n" +
  "export const Container = styled.View<ITypeProps>`" +
  "\n" +
  "  width: ${RFValue(300)}px;" +
  "\n" +
  "  border-radius: 5px;" +
  "\n" +
  "  padding: 19px 23px ${RFValue(42)}px;" +
  "\n" +
  "  margin-right: 16px;" +
  "\n" +
  "\n" +
  "  background-color: ${({ theme, type }) => type === 'up' ? theme.colors.up : theme.colors.down};" +
  "\n" +
  "`;" +
  "\n" +
  "\n" +
  "export const Title = styled.Text<ITypeProps>`" +
  "\n" +
  "  font-size: ${RFValue(40)}px;" +
  "\n" +
  "\n" +
  "  font-family: ${({ theme }) => theme.fonts.regular};" +
  "\n" +
  "\n" +
  "  background-color: ${({ theme, type }) => type === 'up' ? theme.colors.up : theme.colors.down};" +
  "\n" +
  "\n" +
  "  ${(props) => props.type === 'up' && css`color: ${({ theme }) => theme.colors.up};`};" +
  "\n" +
  "\n" +
  "  ${(props) => props.type === 'down' && css`color: ${({ theme }) => theme.colors.down};`};" +
  "\n" +
  "`;";

createFile(componentPath, componentContent);

createFile(stylesPath, stylesContent);
