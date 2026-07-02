/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'welcome' | 'journey' | 'wishes' | 'canvas' | 'celebration';

export interface PageDefinition {
  id: PageId;
  label: string;
  description: string;
}

export interface SparkleConfig {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export interface FloatingPetalConfig {
  id: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
  horizontalDrift: number;
}
